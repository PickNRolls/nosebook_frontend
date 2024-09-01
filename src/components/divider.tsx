export type DividerProps = {
  children?: string;
}

export const Divider: React.FC<DividerProps> = (props) => {
  return (
    <div className="w-full border-slate-200 border-b flex justify-center my-2">
      <span className="text-slate-300 text-sm text-center relative text-nowrap">
        <span className="bg-white absolute -translate-y-1/2 -translate-x-1/2 px-3">
          {props.children}
        </span>
      </span>
    </div>
  )
};
