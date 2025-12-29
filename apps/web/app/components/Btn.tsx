
export const CustomBtn = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
    return <div>
        <button onClick={onClick} className="rounded-lg bg-purple-200 px-2 py-1.5 text-neutral-800 text-sm cursor-pointer active:scale-98">{children}</button>
    </div>
}