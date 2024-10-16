import { WatchedList } from "./watched-list";

class NumberWatchedList extends WatchedList<number> {
    compareItems(a: number, b: number): boolean {
        return a === b
    }
}

describe('watched list', () => {
    it('shold be able to create a watched list with initial items', () => {
        const list = new NumberWatchedList([1, 2, 3])

        expect(list.currentItems).toHaveLength(3)
    })

    it('shold be able to add new items to the list', () => {
        const list = new NumberWatchedList([1, 2, 3])

        list.add(4)

        expect(list.currentItems).toHaveLength(4)
        expect(list.getNewItems()).toEqual([4])
    })

    it('shold be able to remove items from list', () => {
        const list = new NumberWatchedList([1, 2, 3])

        list.remove(2)

        expect(list.currentItems).toHaveLength(2)
        expect(list.getRemovedItems()).toEqual([2])
    })

    it('shold be able to add items to list even if it was removed before ', () => {
        const list = new NumberWatchedList([1, 2, 3])

        list.remove(2)
        list.add(2)

        expect(list.currentItems).toHaveLength(3)
        expect(list.getRemovedItems()).toEqual([])
        expect(list.getNewItems()).toEqual([])
    })

    it('shold be able to update items list ', () => {
        const list = new NumberWatchedList([1, 2, 3])

        list.update([2, 5, 10])

        expect(list.getRemovedItems()).toEqual([1, 3])
        expect(list.getNewItems()).toEqual([5, 10])
    })
})