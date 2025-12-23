// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ChainForgeNFT
 * @author ChainForge
 *
 * @notice
 * A privacy-first proof-of-existence NFT contract.
 * Each NFT represents a cryptographic proof (hash) of a digital file.
 *
 * - Files are NEVER stored on-chain
 * - Only the hash is recorded
 * - Each hash can be minted exactly once
 * - Ownership of the proof is publicly verifiable
 */
contract ChainForgeNFT is ERC721URIStorage, Ownable {
    /// @dev Next token ID (starts at 1 so 0 can mean "non-existent")
    uint256 private nextTokenId = 1;

    /// @dev Mapping from file hash to token ID
    mapping(bytes32 => uint256) private hashToTokenId;

    /// @dev Emitted when a new proof is forged
    event ProofForged(
        address indexed owner,
        uint256 indexed tokenId,
        bytes32 indexed fileHash,
        string tokenURI
    );

    constructor()
        ERC721("ChainForge Proof", "CFP")
        Ownable(msg.sender)
    {}

    /**
     * @notice Mint a new proof-of-existence NFT
     * @param fileHash SHA-256 hash of the file
     * @param tokenURI IPFS URI containing metadata
     */
    function mintProof(bytes32 fileHash, string calldata tokenURI) external {
        require(fileHash != bytes32(0), "Invalid file hash");
        require(hashToTokenId[fileHash] == 0, "Proof already exists");

        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        hashToTokenId[fileHash] = tokenId;

        emit ProofForged(msg.sender, tokenId, fileHash, tokenURI);
    }

    /**
     * @notice Check whether a proof exists for a given file hash
     */
    function verifyAsset(bytes32 fileHash) external view returns (bool) {
        return hashToTokenId[fileHash] != 0;
    }

    /**
     * @notice Get token ID associated with a file hash
     * @dev Reverts if proof does not exist
     */
    function getTokenIdByHash(bytes32 fileHash)
        external
        view
        returns (uint256)
    {
        uint256 tokenId = hashToTokenId[fileHash];
        require(tokenId != 0, "Proof does not exist");
        return tokenId;
    }

    /**
     * @notice Get owner of the proof NFT for a given file hash
     * @dev Reverts if proof does not exist
     */
    function getOwnerByHash(bytes32 fileHash)
        external
        view
        returns (address)
    {
        uint256 tokenId = hashToTokenId[fileHash];
        require(tokenId != 0, "Proof does not exist");

        address owner = _ownerOf(tokenId);
        require(owner != address(0), "Token not found for existing proof");
        return owner;
    }
}
