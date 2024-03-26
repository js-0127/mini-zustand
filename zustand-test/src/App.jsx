import { useAAAStore } from "./store";

function App() {
  const aaa = useAAAStore((state) => state.aaa);
  const updateAaa = useAAAStore((state) => state.updateAaa);
  console.log(updateAaa, aaa);

  return (
    <>
      <input
        type="text"
        value={aaa}
        onChange={(e) => updateAaa(e.target.value)}
      />
      {aaa}
    </>
  );
}

export default App;
