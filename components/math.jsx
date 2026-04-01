"use client";

import {useEffect, useMemo, useRef, useState} from "react";

const target = "\\frac{QK^T}{\\sqrt{d_k}}";

function normText(text) {
  return text.replace(/\s+/g, "").replace(/\\left|\\right/g, "");
}

function sameExpr(lhs, rhs) {
  if (normText(lhs) === normText(rhs)) {
    return true;
  }
  try {
    // eslint-disable-next-line global-require
    const {ComputeEngine} = require("@cortex-js/compute-engine");
    const ce = new ComputeEngine();
    const left = ce.parse(lhs).simplify();
    const right = ce.parse(rhs).simplify();
    return Boolean(left.isSame(right));
  } catch (_err) {
    return false;
  }
}

export function MathBox() {
  const host = useRef(null);
  const [latex, setLatex] = useState("");
  const [state, setState] = useState("idle");

  useEffect(() => {
    let live = true;
    async function init() {
      await import("mathlive");
      if (!live || !host.current) {
        return;
      }
      host.current.addEventListener("input", onInput);
    }
    function onInput(event) {
      const value = event.target.getValue("latex-expanded");
      setLatex(value);
    }
    init();
    return () => {
      live = false;
      if (host.current) {
        host.current.removeEventListener("input", onInput);
      }
    };
  }, []);

  const msg = useMemo(() => {
    if (state === "ok") {
      return "正确。你写出了 scaled dot-product attention 的核心缩放项。";
    }
    if (state === "bad") {
      return "还不对。注意分子是 QK^T，分母是 sqrt(d_k)。";
    }
    return "请输入注意力打分中的缩放项。";
  }, [state]);

  function onCheck() {
    setState(sameExpr(latex, target) ? "ok" : "bad");
  }

  return (
    <article className="box">
      <div className="boxTop">
        <h2>Formula Check</h2>
        <span>mathlive</span>
      </div>
      <p className="boxText">写出 scaled dot-product attention 的核心项。</p>
      <div className="mathWrap">
        <math-field
          ref={host}
          class="mathField"
          default-mode="math"
          virtual-keyboard-mode="manual"
        />
      </div>
      <button className="actBtn" onClick={onCheck}>
        Check
      </button>
      <p className={`msg ${state}`}>{msg}</p>
      <p className="subtle">目标表达式：QK^T / sqrt(d_k)</p>
    </article>
  );
}
