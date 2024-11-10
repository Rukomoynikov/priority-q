import { PriorityQueue } from "../src/index";

interface Project {
  capital: number;
  profit: number;
}

describe("Max Heap", () => {
  describe("Insert", () => {
    test("Basic insert", () => {
      const obj = { capital: 1, profit: 2 };
      const mh = new PriorityQueue<Project, "profit">("profit");
      mh.insert(obj);
      expect(mh.heap).toStrictEqual([obj]);
    });

    test("Basic sorting", () => {
      const obj = { capital: 1, profit: 10 };
      const obj_2 = { capital: 1, profit: 100 };
      const obj_3 = { capital: 1, profit: 1 };
      const obj_4 = { capital: 1, profit: 1000 };

      const mh = new PriorityQueue<Project, "profit">("profit");

      mh.insert(obj);
      mh.insert(obj_2);
      mh.insert(obj_3);
      mh.insert(obj_4);

      expect(mh.heap).toStrictEqual([obj_4, obj_2, obj_3, obj]);
    });

    test("Many values", () => {
      const mh = new PriorityQueue<Project, "profit">("profit");

      [10, 5, 2, 1, 100].forEach((num) =>
        mh.insert({
          profit: num,
          capital: num,
        }),
      );

      expect(mh.heap).toStrictEqual([
        { capital: 100, profit: 100 },
        { capital: 10, profit: 10 },
        { capital: 2, profit: 2 },
        { capital: 1, profit: 1 },
        { capital: 5, profit: 5 },
      ]);
    });
  });

  describe("Remove", () => {
    test("Basic scenario", () => {
      const mh = new PriorityQueue<Project, "profit">("profit");
      const obj = { capital: 1, profit: 10 };
      mh.remove();

      expect(mh.heap).toStrictEqual([]);
    });

    test("Remove all values", () => {
      const mh = new PriorityQueue<Project, "profit">("profit");

      [10, 5, 2, 1, 100].forEach((num) =>
        mh.insert({
          profit: num,
          capital: num,
        }),
      );

      [10, 5, 2, 1, 100].forEach((_) => mh.remove());

      expect(mh.heap).toStrictEqual([]);
    });

    test("Remove one and resort", () => {
      const mh = new PriorityQueue<Project, "profit">("profit");

      [100, 40, 70, 10, 5, 2, 25, 1].forEach((num) =>
        mh.insert({
          profit: num,
          capital: num,
        }),
      );

      mh.remove();

      expect(mh.heap).toStrictEqual([
        { capital: 70, profit: 70 },
        { capital: 40, profit: 40 },
        { capital: 25, profit: 25 },
        { capital: 10, profit: 10 },
        { capital: 5, profit: 5 },
        { capital: 2, profit: 2 },
        { capital: 1, profit: 1 },
      ]);
    });

    test("Leetcode with duplicates", () => {
      const mh = new PriorityQueue<Project, "profit">("profit");

      [1, 4, 5, 1, 3, 4, 2, 6].forEach((num) =>
        mh.insert({
          profit: num,
          capital: num,
        }),
      );

      const sortedMax = [1, 4, 5, 1, 3, 4, 2, 6].map((_) => {
        return mh.remove()?.profit;
      });

      expect(sortedMax).toStrictEqual([6, 5, 4, 4, 3, 2, 1, 1]);
    });
  });
});
