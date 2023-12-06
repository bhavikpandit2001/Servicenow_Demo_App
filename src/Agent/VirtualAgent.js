import React, { useEffect } from 'react';

const VirtualAgent = () => {
    useEffect(() => {
        const chat = new window.ServiceNowChat({
            instance: 'https://dev145961.service-now.com',
            context: {
                skip_load_history: 1
            },
            branding: {
                bgColor: '#333',
                primaryColor: '#000',
                hoverColor: '#EFEFEF',
                activeColor: '#AAA',
                openIcon: 'custom-open.png',
                closeIcon: 'custom-close.svg',
                sizeMultiplier: 1.6
            },
            offsetX: 50,
            offsetY: 50,
            position: 'right',
            translations: {
                'Open dialog': 'Open chat',
                'Open Chat. {0} unread message(s)': 'Click to open',
                'Close chat.': 'Click to close',
            },
        });

        // Optionally, you can initialize the chat widget here as well
        // window.snClient.initializeWidget({
        //     webClientUrl: 'https://dev145961.service-now.com',
        //     containerSelector: '#sn-chat-widget',
        //     data: {
        //       property1: 'value1',s
        //       property2: 'value2'
        //     }
        // });
    }, []);

    return (
        <div>
            {/ Your other React content here /}
            <div id="sn-chat-widget">hello world </div>
        </div>
    );
};

export default VirtualAgent;
