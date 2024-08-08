import cn from 'classnames';

export type LikeButtonProps = {
  likesCount: number;
  likedByUser: boolean;
  onClick: () => void;
};

export const LikeButton: React.FC<LikeButtonProps> = (props) => {
  const { likesCount, likedByUser } = props;

  return (
    <button
      className={cn("rounded-lg h-8 px-3",
        likedByUser ? "bg-red-400 text-white" : "bg-slate-100 text-slate-500"
      )}
      onClick={props.onClick}
    >
      Like {likesCount > 0 && `(${likesCount})`}
    </button>);
};
