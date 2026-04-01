"use client";

import {useMemo, useState} from "react";
import {DndContext, PointerSensor, closestCenter, useSensor, useSensors} from "@dnd-kit/core";
import {SortableContext, arrayMove, rectSortingStrategy, useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

const goal = ["Input", "Attention", "Add+Norm", "MLP", "Add+Norm"];
const seed = ["MLP", "Input", "Add+Norm", "Attention", "Add+Norm"];

function Tile({id}) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return (
    <div ref={setNodeRef} style={style} className="tile" {...attributes} {...listeners}>
      {id}
    </div>
  );
}

export function DragBox() {
  const [items, setItems] = useState(seed);
  const sensors = useSensors(useSensor(PointerSensor));

  const ok = useMemo(() => items.join("|") === goal.join("|"), [items]);

  function onDragEnd(event) {
    const {active, over} = event;
    if (!over || active.id === over.id) {
      return;
    }
    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);
    setItems(arrayMove(items, oldIndex, newIndex));
  }

  return (
    <article className="box">
      <div className="boxTop">
        <h2>Build the Block</h2>
        <span>dnd-kit</span>
      </div>
      <p className="boxText">拖拽卡片，拼出一个最小 Transformer block 的主流程。</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className="tileGrid">
            {items.map((item) => (
              <Tile key={item} id={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <p className={`msg ${ok ? "ok" : "bad"}`}>
        {ok ? "顺序正确。你已经拼出了经典 block 流。": "还没拼对。先想想输入后谁先发生。"}
      </p>
      <p className="subtle">目标：Input → Attention → Add+Norm → MLP → Add+Norm</p>
    </article>
  );
}
