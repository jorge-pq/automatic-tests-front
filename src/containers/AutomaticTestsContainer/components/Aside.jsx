import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import apps from '../../../data/apps.json';

export default function Aside() {
    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: 'auto', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            defaultExpanded={['root']}
        >
            <TreeItem nodeId="root" label="Applications" defaultChecked={true}>
                {
                    apps.map(item =>
                        <TreeItem nodeId={item.id.toString()} label={item.name}>
                             <TreeItem nodeId="8" label="test" />
                        </TreeItem>
                    )
                }
            </TreeItem>
        </TreeView>
    );
}