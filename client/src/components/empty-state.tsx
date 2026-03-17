import Logo from "./logo";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";

interface Props {
  title?: string;
  description?: string;
}
export default function EmptyState({
  title = "No chat selected",
  description = "Pick a chat or start a new one",
}: Props) {
  return (
    <Empty className="w-full h-full flex items-center justify-center bg-muted/20">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="w-20 h-20">
          <Logo showText={false} />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
