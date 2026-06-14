import {BsmEntry} from "@interfaces/api/BsmEntry.ts";
import ArticleIcon from "@mui/icons-material/Article";
import FolderRounded from "@mui/icons-material/FolderRounded";
import {Box, CircularProgress} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import {alpha, styled} from "@mui/material/styles";
import {TransitionProps} from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import {TreeViewBaseItem} from "@mui/x-tree-view/models";
import {RichTreeView} from "@mui/x-tree-view/RichTreeView";
import {treeItemClasses} from "@mui/x-tree-view/TreeItem";
import {TreeItem2Content, TreeItem2IconContainer, TreeItem2Label, TreeItem2Root,} from "@mui/x-tree-view/TreeItem2";
import {TreeItem2Icon} from "@mui/x-tree-view/TreeItem2Icon";
import {TreeItem2Provider} from "@mui/x-tree-view/TreeItem2Provider";
import {useTreeItem2, UseTreeItem2Parameters} from "@mui/x-tree-view/useTreeItem2";
import {animated, useSpring} from "@react-spring/web";
import clsx from "clsx";
import * as React from "react";


interface ExtendedTreeItemProps {
    id: string;
    label: string;
    entry?: BsmEntry;
}

interface CustomLabelProps {
    children: React.ReactNode;
    icon?: React.ElementType | null;
    expandable?: boolean;
}

interface CustomTreeItemProps
    extends Omit<UseTreeItem2Parameters, "rootRef">,
        Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {
    onClickByIcon?: (entry: BsmEntry) => void;
    onClickByContent?: (entry: BsmEntry) => void;
}

const StyledTreeItemRoot = styled(TreeItem2Root)(({theme}) => ({
    color: theme.palette.grey[400],
    position: "relative",
    [`& .${treeItemClasses.groupTransition}`]: {
        marginLeft: theme.spacing(3.5),
    },
    ["& ul.MuiCollapse-root"]: {
        paddingLeft: "20px",
    },
    ...theme.applyStyles("light", {
        color: theme.palette.grey[800],
    }),
})) as unknown as typeof TreeItem2Root;

const CustomTreeItemContent = styled(TreeItem2Content)(({theme}) => ({
    flexDirection: "row",
    borderRadius: theme.spacing(0.7),
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
    fontWeight: 500,
    [`&.Mui-expanded`]: {
        "&:not(.Mui-focused, .Mui-selected, .Mui-selected.Mui-focused) .labelIcon": {
            color: theme.palette.primary.dark,
            ...theme.applyStyles("light", {
                color: theme.palette.primary.main,
            }),
        },
        "&::before": {
            content: "\"\"",
            display: "block",
            position: "absolute",
            left: "16px",
            top: "44px",
            height: "calc(100% - 48px)",
            width: "1.5px",
            backgroundColor: theme.palette.grey[700],
            ...theme.applyStyles("light", {
                backgroundColor: theme.palette.grey[300],
            }),
        },
    },
    "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        color: "white",
        ...theme.applyStyles("light", {
            color: theme.palette.primary.main,
        }),
    },
    [`&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        ...theme.applyStyles("light", {
            backgroundColor: theme.palette.primary.main,
        }),
    },
}));

const StyledTreeItemLabelText = styled(Typography)({
    color: "inherit",
    fontFamily: "General Sans",
    fontWeight: 500,
}) as unknown as typeof Typography;

const AnimatedCollapse = animated(Collapse);

const TransitionComponent = (props: TransitionProps) => {
    const style = useSpring({
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
        },
    });

    return <AnimatedCollapse style={style} {...props} />;
}

const CustomLabel = ({icon, expandable, children, ...other}: CustomLabelProps) => {
    let iconDisplay;
    if (!icon) {
        iconDisplay = (<CircularProgress size={"1rem"} aria-label="Loading…" sx={{marginRight: "8px"}}/>);
    } else {
        iconDisplay = (<Box component={icon} className="labelIcon" color="inherit" sx={{mr: 1, fontSize: "1.2rem"}}/>);
    }

    return (
        <TreeItem2Label
            {...other}
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            {iconDisplay}
            <StyledTreeItemLabelText variant="body2">{children}</StyledTreeItemLabelText>
            {expandable}
        </TreeItem2Label>
    );
}

const isExpandable = (reactChildren: React.ReactNode) => {
    if (Array.isArray(reactChildren)) {
        return reactChildren.length > 0 && reactChildren.some(isExpandable);
    }
    return Boolean(reactChildren);
};

const getIconFromFileType = (fileType: number) => {
    switch (fileType) {
        case 10007:
            return ArticleIcon;
        case 10006:
            return FolderRounded;
        default:
            return null;
    }
};

const CustomTreeItem = React.forwardRef((
    props: CustomTreeItemProps,
    ref: React.Ref<HTMLLIElement>,
) => {
    const {id, itemId, label, disabled, children, onClickByIcon, onClickByContent, ...other} = props;

    const {
        getRootProps,
        getContentProps,
        getIconContainerProps,
        getLabelProps,
        getGroupTransitionProps,
        status,
        publicAPI,
    } = useTreeItem2({id, itemId, children, label, disabled, rootRef: ref});

    const item: TreeViewBaseItem<ExtendedTreeItemProps> = publicAPI.getItem(itemId);
    const entry = item.entry;
    const expandable = isExpandable(children);
    let icon;
    if (expandable) {
        icon = FolderRounded;
    } else if (entry?.entryType) {
        icon = getIconFromFileType(entry.entryType);
    }

    return (
        <TreeItem2Provider itemId={itemId}>
            <StyledTreeItemRoot {...getRootProps(other)}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    if (entry) {
                                        props.onClickByContent?.(entry);
                                    }
                                }}
            >
                <CustomTreeItemContent
                    {...getContentProps({
                        className: clsx("content", {
                            "Mui-expanded": status.expanded,
                            "Mui-selected": status.selected,
                            "Mui-focused": status.focused,
                            "Mui-disabled": status.disabled,
                        }),
                    })}
                >
                    <TreeItem2IconContainer {...getIconContainerProps()}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                if (entry) {
                                                    props.onClickByIcon?.(entry);
                                                }
                                                publicAPI.setItemExpansion(event, itemId, !status.expanded);
                                            }}
                                            sx={{":hover": {backgroundColor: "rgba(0,0,0,0.3)"}, position: "relative", borderRadius: "50%"}}>
                        <TreeItem2Icon status={status}/>
                    </TreeItem2IconContainer>
                    <CustomLabel
                        {...getLabelProps({icon, expandable: expandable && status.expanded})}
                    />
                </CustomTreeItemContent>
                {children && <TransitionComponent {...getGroupTransitionProps()} />}
            </StyledTreeItemRoot>
        </TreeItem2Provider>
    );
});

const EntrySidebarExplorerComp = ({items, onEntryClick}: { items: TreeViewBaseItem<ExtendedTreeItemProps>[], onEntryClick: (entry: BsmEntry) => void }) => {

    const handleContentClick = (entry: BsmEntry) => {
        onEntryClick(entry);
    }

    const handleIconClick = (entry: BsmEntry) => {
        onEntryClick(entry);
    }


    return (
        <RichTreeView
            items={items}
            slots={{
                item: CustomTreeItem
            }}
            slotProps={{
                item: {
                    onClickByContent: (entry) => {
                        handleContentClick(entry);
                    },
                    onClickByIcon: (entry) => {
                        handleIconClick(entry);
                    }
                } as Partial<CustomTreeItemProps>
            }}
        />
    );
}

export {
    EntrySidebarExplorerComp,
    type ExtendedTreeItemProps,
}
