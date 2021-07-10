class utils {
  /**
   * 高纳德(Knuth)置乱法
   * 在前一次未被选中的概率为 (n - i) / n
   * 本次该格被选中的概率为 1 / (n - i)
   * 相乘后，即任何元素进任意格内的概率为 1 / n
   */
  static shuffle(arr) {
    for (let i = arr.length; i > 0; --i) {
      let k = parseInt(Math.random() * i),
        t = arr[k];
      arr[k] = arr[i - 1];
      arr[i - 1] = t;
    }
  }
}