import { format } from 'date-fns';

export default function MainFooter() {
    return (
        <footer className="flex flex-col items-center gap-y-1">
            <time dateTime="yyyy-MM-dd">
                {format(Date.now(), 'yyyy-MM-dd')}
            </time>
            <div>Edited by 위영진</div>
        </footer>
    );
}
