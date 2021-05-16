pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract Asset is ERC721Full {
  string[] public assets;
  mapping(string => bool) _assetDataExists;

  constructor() ERC721Full("Neeboo token", "NBT") public {
  }

  function mint(string memory _assetData) public {
    require(!_assetDataExists[_assetData]);
    uint _id = assets.push(_assetData);
    _mint(msg.sender, _id);
    _assetDataExists[_assetData] = true;
  }

}
