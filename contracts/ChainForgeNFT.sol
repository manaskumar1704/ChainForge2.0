// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ChainForgeNFT
 * @notice Mints NFTs with cryptographic provenance by binding
 *         a file hash to immutable on-chain metadata.
 */
contract ChainForgeNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    // fileHash => already minted or not
    mapping(bytes32 => bool) private _existingHashes;

    event AssetMinted(
        address indexed owner,
        uint256 indexed tokenId,
        bytes32 indexed fileHash,
        string tokenURI
    );

    constructor()
        ERC721("ChainForge Asset", "CFA")
        Ownable(msg.sender)
    {
        tokenCounter = 0;
    }

    /**
     * @notice Mint a new NFT for a unique digital asset
     * @param tokenURI IPFS URI pointing to metadata JSON
     * @param fileHash SHA-256 hash of the original file
     */
    function mintAsset(
        string calldata tokenURI,
        bytes32 fileHash
    ) external {
        require(!_existingHashes[fileHash], "ChainForge: Asset already minted");

        uint256 tokenId = tokenCounter;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        _existingHashes[fileHash] = true;
        tokenCounter++;

        emit AssetMinted(msg.sender, tokenId, fileHash, tokenURI);
    }

    /**
     * @notice Verify whether a file hash has already been minted
     */
    function verifyAsset(bytes32 fileHash) external view returns (bool) {
        return _existingHashes[fileHash];
    }
}
