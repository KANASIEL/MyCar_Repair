import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./autoSearch.css";

export default function AutoSearch({
  placeholder = "검색어 입력",
  apiPath = "/api/keyword/search",
  debounceMs = 300,
  maxResults = 10,
}) {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  // Fetch function
  const fetchData = useCallback(
    async (q) => {
      if (!q || q.trim() === "") {
        setList([]);
        setOpen(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8484/api/keyword/search", {
          params: { keyword: q },
        });
        const data = Array.isArray(res.data)
          ? res.data.slice(0, maxResults)
          : [];
        setList(data);
        setOpen(data.length > 0);
        setFocusedIndex(-1);
      } catch (err) {
        console.error("AutoSearch: fetch error", err);
        setList([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    },
    [apiPath, maxResults]
  );

  // Debounced effect
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (text.trim() === "") {
      setList([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    timerRef.current = setTimeout(() => fetchData(text), debounceMs);
    return () => clearTimeout(timerRef.current);
  }, [text, debounceMs, fetchData]);

  // Click outside
  useEffect(() => {
    const onClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Keyboard events
  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      if (list.length > 0) setOpen(true);
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((idx) => Math.min(idx + 1, list.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((idx) => Math.max(idx - 1, 0));
        break;
      case "Enter":
        if (open && focusedIndex >= 0 && focusedIndex < list.length) {
          const item = list[focusedIndex];
          if (item && item.link) window.location.href = item.link;
        }
        break;
      case "Escape":
        setOpen(false);
        setFocusedIndex(-1);
        break;
      default:
        break;
    }
  };

  // Click item
  const onSelect = (item) => {
    if (!item) return;
    if (item.link) window.location.href = item.link;
  };

  // 🔥 highlight 기능 완전 제거 → 그냥 텍스트 리턴
  const highlight = (textValue) => textValue;

  return (
    <div ref={containerRef} className="auto-container">
      <div className="auto-input-wrap">
        <input
          id="autosuggest"
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => {
            if (list.length > 0) setOpen(true);
          }}
          placeholder={placeholder}
          className="auto-input"
		  autoComplete="off"
        />

        {loading && <div className="auto-loading">로딩...</div>}
      </div>

      <div
        id="autosuggest-list"
        role="listbox"
        className={`auto-dropdown ${open ? "open" : ""}`}
      >
        {list.length > 0 && (
          <ul className="auto-list">
            {list.map((item, idx) => (
				<li
				  id={`item-${idx}`}
				  key={item.id ?? idx}
				  className={`auto-item ${focusedIndex === idx ? "focused" : ""}`}
				  onMouseEnter={() => setFocusedIndex(idx)}
				  onMouseLeave={() => setFocusedIndex(-1)}
				  onClick={() => onSelect(item)}  // ★ 클릭 시 링크 이동
				>
				  <div className="auto-keyword">
				    {highlight(item.keyword ?? "", text)}
				  </div>
				</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
