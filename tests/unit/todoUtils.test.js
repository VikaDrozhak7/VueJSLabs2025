import { describe, it, expect } from "vitest"
import { getActiveCount, filterTodos } from "../../src/utils/todoUtils"

describe("todo utils", () => {
    it("getActiveCount works", () => {

        const list = [
            { title: "A", done: false },
            { title: "B", done: true }
        ]


        const result = getActiveCount(list)


        expect(result).toBe(1)
    })

    it("filterTodos: active", () => {
        const list = [
            { title: "A", done: false },
            { title: "B", done: true }
        ]

        expect(filterTodos(list, "active")).toEqual([
            { title: "A", done: false }
        ])
    })
})
