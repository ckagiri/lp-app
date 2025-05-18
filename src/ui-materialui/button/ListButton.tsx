import { Link } from "react-router-dom";
import ActionList from '@mui/icons-material/List';
import { ResourceItem, useCreatePath, useResourceContext } from "../../frame";
import { Button, ButtonProps } from "./Button";

export const ListButton = (props: ListButtonProps) => {
    const {
        icon = defaultIcon,
        label = 'List',
        resource: resourceProp,
        scrollToTop = true,
        ...rest
    } = props;
    const resource = useResourceContext(props);
    if (!resource) {
        throw new Error(
            '<ListButton> components should be used inside a <Resource> component or provided the resource prop.'
        );
    }
    const createPath = useCreatePath();

    return (
        <Button
            component={Link}
            to={createPath({ type: 'list', resource: resource.path })}
            state={scrollStates[String(scrollToTop)]}
            label={label}
            {...(rest as any)}
        >
            {icon}
        </Button>
    );
};

// avoids using useMemo to get a constant value for the link state
const scrollStates = {
    true: { _scrollToTop: true },
    false: {},
} as any;

const defaultIcon = <ActionList />;

interface Props {
    icon?: React.ReactNode;
    label?: string;
    resource?: ResourceItem;
    scrollToTop?: boolean;
}

export type ListButtonProps = Props & ButtonProps;
