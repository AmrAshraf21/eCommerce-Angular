
import { computed } from '@angular/core';
import { patchState, signalStore, watchState, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';





export const WishlistStore = signalStore(
    { providedIn: "root" },
    withState<{ wishlistItems: any[] }>({
        wishlistItems: [],
    }),
    withComputed(state => ({
        wishlistLength: computed(() => state.wishlistItems().length)

    })),
    withMethods((state) => ({
        addToWishlist: (product: any) => {

            patchState(state, {
                wishlistItems: [...state.wishlistItems(), product()]
            })
            console.log(state.wishlistItems());

        },
        removeFromWishlist: (id: number) => {
            console.log(state.wishlistItems());

            const newItems = state.wishlistItems().filter(x => x.id !== id);

            console.log(newItems);

            patchState(state, {
                wishlistItems: newItems
            })
        },

        clearWishlist: () => patchState(state, {
            wishlistItems: []
        }),


        toggleItem: (item: any) => {
            const IsExist = state.wishlistItems().some(i => i.id === item.id);
            patchState(state, {
                wishlistItems: IsExist ? state.wishlistItems().filter(x => x.id !== item.id)
                    : [...state.wishlistItems(), item]
            })


        }





    })),


);