/*
  Project: Arena game
  Author:  Copyright (C) 2024, Atanas Laskov

  License: BSD license, see LICENSE.md for more details.

  http://www.atanaslaskov.com/city/
*/

// Limit precision to 3 decimal places
//
export function limitPrecision(n: number) {
  return Math.round( n * 1000.0 ) / 1000;
}
