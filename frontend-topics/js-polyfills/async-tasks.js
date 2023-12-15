/*
Ques - Consider we have multiple async tasks A, B, C, D and E(not promises).
A, B, C are indepent task while D depends on A and B to perform its task
while E dependson D and C to perform task.
Write a task function/class to solve this problem.
*/


class Task {
  isCompleted;
  totalDeps;
  deps;
  subs;
  callback;

  constructor(callback, deps = []) {
    this.isCompleted = false;
    this.totalDeps = deps.length;
    this.deps = deps;
    this.subs = [];
    this.callback = callback;

    this.process();
  }

  process = () => {
    if (this.totalDeps === 0) {
      this.callback(this.done);
      return;
    }

    this.deps.forEach((dep) => {
      dep.subscribe(this.removeSubAndRunTask);
    });
  };

  subscribe = (removeSubAndRunTask) => {
    this.subs.push(removeSubAndRunTask);
  };

  removeSubAndRunTask = () => {
    this.totalDeps--;
    if (this.totalDeps === 0) {
      this.callback(this.done);
    }
  };

  done = () => {
    this.isCompleted = true;
    this.subs.forEach((cb) => cb());
  };
}

const taskA = new Task((done) => {
  setTimeout(() => {
    console.log("task A");
    done();
  }, 1300);
});
const taskB = new Task((done) => {
  setTimeout(() => {
    console.log("task B");
    done();
  }, 5000);
});
const taskC = new Task((done) => {
  setTimeout(() => {
    console.log("task C");
    done();
  }, 1000);
});
const taskD = new Task(
  (done) => {
    setTimeout(() => {
      console.log("task D");
      done();
    }, 3000);
  },
  [taskA, taskB]
);
const taskE = new Task(
  (done) => {
    setTimeout(() => {
      console.log("task E");
      done();
    }, 1000);
  },
  [taskC, taskD]
);
