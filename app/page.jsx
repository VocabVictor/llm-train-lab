import {Shell} from "../components/shell";
import {MathBox} from "../components/math";
import {DragBox} from "../components/drag";

export default function Page() {
  return (
    <main className="page">
      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow">Interactive Training Lab</p>
          <h1>Learn by touching the workflow, not just reading about it.</h1>
          <p className="lede">
            This lab turns abstract training-engineering ideas into guided
            practice: command-line drills, formula checks, and architecture
            puzzles that feel closer to real work.
          </p>
          <div className="heroLinks">
            <a href="https://github.com/VocabVictor/llm-train-docs">Docs</a>
            <a href="https://github.com/VocabVictor/llm-train-demo">Demo</a>
          </div>
        </div>
        <div className="heroCard">
          <div className="chip">初版练习</div>
          <ul>
            <li>命令行生存练习</li>
            <li>公式输入与判定</li>
            <li>Transformer 结构拖拽</li>
          </ul>
        </div>
      </section>

      <section className="grid">
        <Shell />
        <MathBox />
        <DragBox />
      </section>
    </main>
  );
}
