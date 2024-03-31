import {defineStore} from "pinia";
import type {Painting} from "@/types/Painting";
import $api from "@/API/http";
import type {Author} from "@/types/Author";
import type {Location} from "@/types/Location";
import type {Options} from "@/components/UI/Select/Options";
import type {SortInterface} from "@/stores/storeTypes/sortInterface";

export const useStore = defineStore('store', {
    state() {
        return {
            paintings: [] as Painting[],
            sortArtists: [] as Options[],
            sortLocations: [] as Options[],
            selectedOptions: {} as SortInterface,
            searchQuery: '',
            page: 1, // Current Page
            limit: 6, // Total Items in one page
            totalPages: 0, // Maximum amount of ceiled pages
        }
    },
    getters: {
        getSearchedPaintings(state): (k: string) => Painting[] {
            return (query: string): Painting[] => state.paintings.filter(painting => painting.name.toLowerCase().includes(query.toLowerCase())) as Painting[];
        },
        getSearchedAndFilteredPaintings(state): Painting[] {
            let temp = this.getSearchedPaintings(state.searchQuery);
            if (Object.entries(state.selectedOptions).length) {
                for (const [option, value] of Object.entries(state.selectedOptions)) {
                    temp = temp.filter(painting => {
                        if (typeof value === "string" && painting[option as keyof Painting]) {
                            return painting[option as keyof Painting] === value;
                        }
                        if (option === 'years' && typeof value !== 'string') {
                            return Number(painting.created) > Number(value?.from ?? 0) && Number(painting.created) < Number(value?.to ?? 2077);
                        }
                    })
                }
            }
            return temp;
        },
    },
    actions: {
        async setPaintings() {
            const paintings = await $api.get<Painting[]>('/paintings', {
                params: {
                    _page: this.page,
                    _limit: this.limit
                }
            });
            this.totalPages = Math.ceil(paintings.headers['x-total-count'] / this.limit);
            const authors = await $api.get<Author[]>('/authors');
            const locations = await $api.get<Location[]>('/locations');
            try {
                paintings.data.forEach((painting, index) => {
                    for (let i = 0; authors.data.length > i; i += 1) {
                        if (painting.authorId === authors.data[i].id) {
                            const modPainting = painting;
                            modPainting.author = authors.data[i].name;
                        }
                    }
                    for (let i = 0; locations.data.length > i; i += 1) {
                        if (painting.locationId === locations.data[i].id) {
                            const modPainting = painting;
                            modPainting.location = locations.data[i].location;
                        }
                    }
                })
                this.paintings = paintings.data;
            } catch (error) {
                console.log(error);
            }
        },
        async setArtists() {
            const authors = await $api.get<Author[]>('/authors');
            try {
                const middleArtists: Options[] = []
                authors.data.forEach(author => {
                    const newAuthor = {
                        value: author.name,
                        name: author.name
                    }
                    middleArtists.push(newAuthor);
                })
                this.sortArtists = middleArtists;
            } catch (e) {
                console.log(e);
            }
        },
        async setLocations() {
            const locations = await $api.get<Location[]>('/locations');
            try {
                const middleLocations: Options[] = [];
                locations.data.forEach(location => {
                    const newLocation = {
                        value: location.location,
                        name: location.location
                    }
                    middleLocations.push(newLocation);
                })
                this.sortLocations = middleLocations;
            } catch (e) {
                console.log(e);
            }
        }
    }
})