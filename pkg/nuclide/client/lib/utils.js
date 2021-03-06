'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var {sep: pathSeperator, normalize} = require('path');
var {realpathSync} = require('fs');

/**
 * Returns if the `rootPath` directory contains the `checkPath` which could be:
 *  - A file or directory path that's a direct child of the root path.
 *  - A file or directory path that's a deep child of the root path.
 *  - The exact `rootPath` in an exact or symlinked form.
 *  - May end in a trailing slash if it's a directory path.
 * Follows symlinks to figure out if the real paths of the root and check paths matches.
 */
function containsPathSync(rootPath: string, checkPath: string): boolean {
  var realRootPath = null;
  var realCheckPath = null;
  try {
    realRootPath = realpathSync(rootPath);
    realCheckPath = realpathSync(checkPath);
  } catch (e) {
    realRootPath = rootPath;
    realCheckPath = checkPath;
  }

  var normalizedRootPath = normalize(realRootPath);
  var normalizedCheckPath = normalize(realCheckPath);

  var rootPathNumberOfParts = normalizedRootPath.split(pathSeperator).length;
  // Extract the matching piece of the normalized path to compare with the root path.
  var rootPathMatch = normalizedCheckPath.split(pathSeperator).slice(0, rootPathNumberOfParts).join(pathSeperator);
  return rootPathMatch === normalizedRootPath;
}

module.exports = {
  containsPathSync,
};
