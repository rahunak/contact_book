import React, { MouseEventHandler } from 'react';
import { v4 as uuidv4 } from 'uuid';


class Group {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
  }
}

export default Group;
