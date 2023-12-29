/*
  Project: Golden
  Author:  Copyright (C) 2023, Atanas Laskov

  License: BSD license, see LICENSE for more details.

  http://www.laskov.co.uk/city/
*/

import { Point } from "./point";

export enum GridSnapType {
  TOP_LEFT, CENTER
}

// 2D grid with ability to snap points to the specified grid size
//
export class Grid {
  private dimension: Point;

  constructor(dimension: Point) {
    this.dimension = dimension;
  }

  // Snap vector coordinates to the grid
  //
  snap( vector: Point, snapTo: GridSnapType = GridSnapType.TOP_LEFT ): Point {
    let pos: Point = this.getWorldPosition( this.getGridIndex(vector) );

    switch( snapTo ) {
      case GridSnapType.CENTER:
        return Point.plus( pos, new Point(this.dimension.x*0.5, this.dimension.y*0.5) );
    }
    return pos;
  }

  // Get the grid dimension
  //
  getDimension(): Point {
    return this.dimension;
  }

  // Convert grid index to world coordinates
  //
  getWorldPosition( index: Point ): Point {
    return new Point(index.x * this.dimension.x, index.y * this.dimension.y);
  }

  //Convert world coordinates to grid index
  //
  getGridIndex( position: Point ): Point {
    return new Point( Grid.toIndex(position.x, this.dimension.x), Grid.toIndex(position.y, this.dimension.y) );
  }

  // Snap coordinate to the grid
  //
  private static toIndex( c: number, d: number ): number {
    return Math.round( c / d );
  }
}