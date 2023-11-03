import { useAccount } from 'wagmi';
import { snapshots } from '../data/snapshot';
import { encodeAbiParameters, keccak256, parseAbiParameters } from 'viem';
import { MerkleTree } from 'merkletreejs';


export default function useGetProofAndMaxMint() {
  const { address } = useAccount();
  
  const getProof = (): { error: boolean; proof: `0x${string}`[]; maxMint: number } => {
    if (address) {
      const found = snapshots.find((snapshot) => snapshot.address === address);
      const proof = generateProof(address, found?.maxMint || 1);

      return {
        error: !found || !proof,
        proof,
        maxMint: found?.maxMint || 1,
      };
    }

    return {
      error: false,
      proof: [],
      maxMint: 1,
    };
  };

  const generateMerkleRoot = (): string => {
    const list = snapshots.map((snapshot) => {
      return encodeLeaf(snapshot.address, snapshot.maxMint);
    });
    const merkleTree = new MerkleTree(list, keccak256, {
      hashLeaves: true, // Hash each leaf using keccak256 to make them fixed-size
      sortPairs: true, // Sort the tree for determinstic output
      sortLeaves: true,
    });
    return merkleTree.getHexRoot();
  }
  
  return { getProof, generateMerkleRoot };
}

function encodeLeaf(address: string, spots: number) {
  // Same as `abi.encodePacked` in Solidity
  return encodeAbiParameters(
    parseAbiParameters('address, uint16'), // The datatypes of arguments to encode
    [address as `0x${string}`, spots] // The actual values
  );
}

function generateProof(address: string, maxAmount: number) {
  const list = snapshots.map((snapshot) => {
    return encodeLeaf(snapshot.address, snapshot.maxMint);
  });
  const merkleTree = new MerkleTree(list, keccak256, {
    hashLeaves: true, // Hash each leaf using keccak256 to make them fixed-size
    sortPairs: true, // Sort the tree for determinstic output
    sortLeaves: true,
  });
  const leaf = keccak256(encodeLeaf(address, maxAmount));
  const proofs = merkleTree.getHexProof(leaf) as `0x${string}`[];
  // const byteProof = proofs.map((proof) => fromHex(proof, 'bytes'));
  return proofs;
}