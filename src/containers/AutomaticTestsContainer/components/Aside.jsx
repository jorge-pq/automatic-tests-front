import * as React from 'react';
// import TreeView from '@mui/lab/TreeView';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import TreeItem from '@mui/lab/TreeItem';
import {useRouter} from 'next/router';

export default function Aside({apps}) {

    const router = useRouter();

    const goToTest = id => {
      router.push(`/test/${id}`);
    }

    return (
        // <TreeView
        //     aria-label="file system navigator"
        //     defaultCollapseIcon={<ExpandMoreIcon />}
        //     defaultExpandIcon={<ChevronRightIcon />}
        //     sx={{ height: 'auto', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        //     defaultExpanded={['root']}
        // >
        //     <TreeItem nodeId="root" label="Applications" defaultChecked={true}>
        //         {
        //             apps.map(item =>
        //                 <TreeItem nodeId={item.code.toString()} label={item.name}>
        //                     {
        //                         item.tests.map(t => <TreeItem onClick={()=>goToTest(t._id)} nodeId={t._id.toString()} label={t.description} />)
        //                     }
                             
        //                 </TreeItem>
        //             )
        //         }
        //     </TreeItem>
        // </TreeView>
        <></>
    );
}