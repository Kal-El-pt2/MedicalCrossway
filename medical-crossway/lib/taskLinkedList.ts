import { Task } from './types';

export class TaskNode {
  task: Task;
  next: TaskNode | null = null;

  constructor(task: Task) {
    this.task = task;
  }
}

export class TaskLinkedList {
  head: TaskNode | null = null;
  private map: Map<string, TaskNode> = new Map();

  static fromArray(tasks: Task[]): TaskLinkedList {
    const list = new TaskLinkedList();
    tasks.forEach(t => list.insert(t));
    return list;
  }

  insert(task: Task): void {
    const node = new TaskNode(task);
    this.map.set(task.id, node);
    if (!this.head) { this.head = node; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }

  findById(id: string): TaskNode | null {
    return this.map.get(id) ?? null;
  }

  getRequirements(task: Task): Task[] {
    return task.requirements
      .map(id => this.findById(id)?.task)
      .filter((t): t is Task => !!t);
  }

  getNextTasks(task: Task): Task[] {
    return task.nextTasks
      .map(id => this.findById(id)?.task)
      .filter((t): t is Task => !!t);
  }

  getParallelTasks(task: Task): Task[] {
    return task.parallelTasks
      .map(id => this.findById(id)?.task)
      .filter((t): t is Task => !!t);
  }

  toArray(): Task[] {
    const result: Task[] = [];
    let curr = this.head;
    while (curr) { result.push(curr.task); curr = curr.next; }
    return result;
  }
}