/** Temporary square mark for favicons until the client's icon.svg arrives. [CONFIRM] */
export function IconMark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0b0b",
        borderRadius: size > 64 ? size * 0.22 : size * 0.2,
      }}
    >
      <div
        style={{
          width: size * 0.42,
          height: size * 0.42,
          borderRadius: size * 0.08,
          background: "#d92d20",
        }}
      />
    </div>
  );
}
