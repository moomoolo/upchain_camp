import { ethers } from "hardhat";

async function main() {
  const Counter = await ethers.getContractFactory('Counter')
  const [deployer] = await ethers.getSigners()
  console.log('----- deployer address: ', deployer.address)
  const deployerBalance = await deployer.getBalance()
  console.log('----- deployer balance: ', ethers.utils.formatEther(deployerBalance))
  const gasPrice = await deployer.getGasPrice()
  const gasLimit = await deployer.estimateGas(Counter.getDeployTransaction())
  const deployPrice = gasLimit.mul(gasPrice)
  console.log('----- deploy price: ', ethers.utils.formatEther(deployPrice))
  if (deployerBalance.lt(deployPrice)) {
    throw new Error('insufficient balance')
  }
  const counter = await Counter.connect(deployer).deploy()
  await counter.deployed()
  console.log('----- contract address: ', counter.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
