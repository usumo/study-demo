function Game2048(n) {
  let mat = []
  ds = [
      [0, n, 1],
      [n - 1, 0, -1],
      [0, n, 1],
      [n - 1, 0, -1]
    ],
    merge = false;
  for (let i = 0; i < n; ++i) {
    let line = [];
    line.length = n;
    line.fill(0);
    mat.push(line);
  }

  function compactUp(j) {
    let p = 0;
    for (let i = 0; i < n; ++i) {
      if (mat[i][j] != 0) {
        let val = mat[i][j];
        mat[i][j] = 0;
        mat[p++][j] = val;
      }
    }
  }

  this.moveUp = () => {
    merge = false;

    for (let j = 0; j < n; ++j) {
      compactUp(j);
      for (let i = 0; i < n - 1; ++i) {
        if (mat[i][j] != 0 && mat[i][j] == mat[i + 1][j]) {
          mat[i][j] <<= 1;
          mat[i + 1][j] = 0;
          merge = true;
        }
      }
      compactUp(j);
    }
  }

  function compactDown(j) {
    let p = n - 1;
    for (let i = n - 1; i >= 0; --i) {
      if (mat[i][j] != 0) {
        let val = mat[i][j];
        mat[i][j] = 0;
        mat[p--][j] = val;
      }
    }
  }

  this.moveDown = () => {
    merge = false;

    for (let j = 0; j < n; ++j) {
      compactDown(j);
      for (let i = n - 1; i > 0; --i) {
        if (mat[i][j] != 0 && mat[i][j] == mat[i - 1][j]) {
          mat[i][j] <<= 1;
          mat[i - 1][j] = 0;
          merge = true;
        }
      }
      compactDown(j);
    }
  }

  function compactLeft(i) {
    let p = 0;
    for (let j = 0; j < n; ++j) {
      if (mat[i][j] != 0) {
        let val = mat[i][j];
        mat[i][j] = 0;
        mat[i][p++] = val;
      }
    }
  }

  this.moveLeft = () => {
    merge = false;

    for (let i = 0; i < n; ++i) {
      compactLeft(i);
      for (let j = 0; j < n - 1; ++j) {
        if (mat[i][j] != 0 && mat[i][j] == mat[i][j + 1]) {
          mat[i][j] <<= 1;
          mat[i][j + 1] = 0;
          merge = true;
        }
      }
      compactLeft(i);
    }
  }

  function compactRight(i) {
    let p = n - 1;
    for (let j = n - 1; j >= 0; --j) {
      if (mat[i][j] != 0) {
        let val = mat[i][j];
        mat[i][j] = 0;
        mat[i][p--] = val;
      }
    }
  }

  this.moveRight = () => {
    merge = false;

    for (let i = 0; i < n; ++i) {
      compactRight(i);
      for (let j = n - 1; j > 0; --j) {
        if (mat[i][j] != 0 && mat[i][j] == mat[i][j - 1]) {
          mat[i][j] <<= 1;
          mat[i][j - 1] = 0;
          merge = true;
        }
      }
      compactRight(i);
    }
  }

  this.randBlock = (seed = 0.5) => {
    let sites = [];
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < n; ++j) {
        if (mat[i][j] == 0) {
          sites.push([i, j]);
        }
      }
    }
    if (sites.length) {
      utils.shuffle(sites);
      mat[sites[0][0]][sites[0][1]] = (Math.random() > seed ? 4 : 2);
    }
  }

  this.isMerge = () => merge;

  this.toMat = () => mat;

  this.showMat = () => {
    for (let i = 0; i < n; ++i) {
      let line = [];
      for (let j = 0; j < n; ++j) {
        line.push(mat[i][j]);
      }
      console.log(line.join(" "));
    }
  }
}