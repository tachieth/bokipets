import { readBokiPets } from '../generated'


export default function useGetBokiPetsMintedIds() {
  const checkIfTokensAlreadyMinted = async (ids: string[]) => {
    const alreadyMinted = [];

    for await (const id of ids) {
      const minted = await readBokiPets({
        functionName: 'checkIfMinted',
        args: [Number(id)],
      });

      if (minted) {
        alreadyMinted.push(id)
      }
    }

    return alreadyMinted
  }
  return { checkIfTokensAlreadyMinted };
}
