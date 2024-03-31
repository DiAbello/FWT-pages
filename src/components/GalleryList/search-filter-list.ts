import type {Painting} from "@/types/Painting";
export default function paintingsProvider(paintings: Painting[], query: string) {
    const searchedPaintings = paintings.filter(painting => painting.name.match(query))

    return {
        searchedPaintings
    }
}