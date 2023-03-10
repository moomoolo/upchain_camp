import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", function () {
  async function deployFixture() {
    const Counter = await ethers.getContractFactory('Counter')
    const [deployer, addr1] = await ethers.getSigners()
    const counter = await Counter.connect(deployer).deploy()
    return { counter, deployer, addr1 }
  }

  it('call by deployer', async () => {
    const { counter, deployer } = await loadFixture(deployFixture)
    await counter.connect(deployer).count()
    expect(await counter.counter()).to.equal(1)
  })
  it('call by others', async () => {
    const { counter, addr1 } = await loadFixture(deployFixture)
    await expect(counter.connect(addr1).count()).to.be.revertedWith('Only deployer')
  })
})
