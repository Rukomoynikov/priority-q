class PriorityQueue<T, FieldToSort extends keyof T> {
  public readonly fieldToSort: FieldToSort;
  public readonly heap: T[];
  private funcToSort: (a: T, b: T) => boolean;

  constructor(fieldToSort: FieldToSort, funcToSort?: (a: T, b: T) => boolean) {
    this.fieldToSort = fieldToSort;
    this.funcToSort = funcToSort || this.compareValues;
    this.heap = [];
  }

  insert(value: T): void {
    this.heap.push(value);
    if (this.heap.length == 1) return;

    this.heapifyUp(this.heap.length - 1);
  }

  private heapifyUp(nodeIndex: number): void {
    if (nodeIndex == 0) return;

    const nodeValue = this.heap[nodeIndex];

    const parentIndex = Math.floor((nodeIndex - 1) / 2);
    const parentValue = this.heap[parentIndex];

    if (this.funcToSort(nodeValue, parentValue)) {
      [this.heap[parentIndex], this.heap[nodeIndex]] = [
        this.heap[nodeIndex],
        this.heap[parentIndex],
      ];
      this.heapifyUp(parentIndex);
    }
  }

  remove(): T | null {
    if (this.heap.length == 0) return null;
    if (this.heap.length == 1) return this.heap.pop() as T;

    const top = this.heap[0];
    const last = this.heap.pop() as T;

    this.heap[0] = last;

    this.heapifyDown(0);

    return top;
  }

  private heapifyDown(nodeIndex: number): void {
    if (nodeIndex == this.heap.length - 1) return;

    const nodeValue = this.heap[nodeIndex];

    const leftChildIndex = Math.floor(nodeIndex * 2 + 1);
    const rightChildIndex = Math.floor(nodeIndex * 2 + 2);

    const leftChildValue =
      this.heap[leftChildIndex] != undefined
        ? this.heap[leftChildIndex][this.fieldToSort]
        : null;
    const rightChildValue =
      this.heap[rightChildIndex] != undefined
        ? this.heap[rightChildIndex][this.fieldToSort]
        : null;

    let indexToSwap: number | undefined;
    if (rightChildValue == null && leftChildValue != null) {
      indexToSwap = leftChildIndex;
    } else if (leftChildValue == null && rightChildValue != null) {
      indexToSwap = rightChildIndex;
    } else if (leftChildValue == null && rightChildValue == null) {
      return;
    } else {
      indexToSwap = this.funcToSort(
        this.heap[rightChildIndex],
        this.heap[leftChildIndex],
      )
        ? rightChildIndex
        : leftChildIndex;
    }

    if (
      this.heap[indexToSwap][this.fieldToSort] > nodeValue[this.fieldToSort]
    ) {
      [this.heap[indexToSwap], this.heap[nodeIndex]] = [
        this.heap[nodeIndex],
        this.heap[indexToSwap],
      ];
      this.heapifyDown(indexToSwap);
    }
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  private compareValues(a: T, b: T) {
    return a[this.fieldToSort] > b[this.fieldToSort];
  }
}

export { PriorityQueue };
