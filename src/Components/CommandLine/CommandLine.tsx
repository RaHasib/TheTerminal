
import {Terminal} from 'primereact/terminal';

import './CommandLine.css';
import useCommandLine from './useCommandLine';
function CommandLine() {
   useCommandLine();
     return (
         <div style={{
             height: '100%',
             display:'grid',
             position:'relative'
         }}>
             <div style={{
                 padding: 10,
                 borderRadius: 5,
                 color: 'lime',
                 overflow: 'auto',
                 flexGrow: 1,
                 background: 'rgba(255, 255, 255, 0.1)',
                 boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                 backdropFilter: 'blur(4px)',
                 border: '1px solid rgba(255, 255, 255, 0.18)',
             }}>
                 <p style={{color: 'lime'}}>Enter "<strong>date</strong>" to display the current date, "<strong>joke</strong>"
                     to get a random Dad joke, and "<strong>clear</strong>" to clear all commands.</p>
                 <Terminal
                     welcomeMessage="Welcome to The Terminal!"
                     prompt="user $"

                 />
             </div>
         </div>
     );
}


export default CommandLine;