"use client";

import {useMemo, useState} from "react";

const steps = [
  {
    need: ["pwd"],
    prompt: "先确认当前工作目录。",
    out: "/workspace/train-job"
  },
  {
    need: ["ls"],
    prompt: "现在列出目录，看看有哪些关键入口。",
    out: "configs  logs  scripts  ckpt"
  },
  {
    need: ["tail -f logs/train.log", "tail logs/train.log"],
    prompt: "最后，追踪训练日志。",
    out: "epoch=1 loss=0.61\nepoch=2 loss=0.48\nsaved checkpoint=model.pt"
  }
];

export function Shell() {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    "$ 欢迎来到训练任务接手练习",
    "$ 目标：按顺序查看目录和日志"
  ]);
  const step = steps[idx];
  const done = idx >= steps.length;

  const hint = useMemo(() => {
    if (done) {
      return "你已经完成最小命令链路：定位 -> 浏览 -> 跟日志。";
    }
    return step.prompt;
  }, [done, step]);

  function onRun(event) {
    event.preventDefault();
    const cmd = input.trim();
    if (!cmd) {
      return;
    }
    const next = [...lines, `$ ${cmd}`];
    if (done) {
      next.push("练习已完成，刷新页面可重来。");
      setLines(next);
      setInput("");
      return;
    }
    if (step.need.includes(cmd)) {
      next.push(step.out);
      setIdx((cur) => cur + 1);
    } else {
      next.push("不太对。先想想当前目标要看的是路径、目录，还是日志。");
    }
    setLines(next);
    setInput("");
  }

  return (
    <article className="box">
      <div className="boxTop">
        <h2>Shell Drill</h2>
        <span>{done ? "done" : `step ${idx + 1}/${steps.length}`}</span>
      </div>
      <p className="boxText">{hint}</p>
      <div className="term">
        {lines.map((line, index) => (
          <div key={`${line}-${index}`} className="termLine">
            {line}
          </div>
        ))}
      </div>
      <form className="termForm" onSubmit={onRun}>
        <span>$</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="try: pwd"
        />
      </form>
    </article>
  );
}
