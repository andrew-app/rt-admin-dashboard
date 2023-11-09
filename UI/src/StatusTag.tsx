
export type StatusTypes = 'ACTIVE' | 'SUSPENDED' | 'PENDING';

interface StatusTagProps {
    userStatus: StatusTypes;
}


export const StatusTag = ({userStatus}: StatusTagProps) => {
    switch (userStatus) {
        case 'ACTIVE':
            return (
                <span style={{ backgroundColor: '#81c784', padding: '0.2rem', borderRadius: '5px', fontFamily: 'Quicksand', fontWeight: '600'}}>
                    Active
                </span>
            );
        case 'SUSPENDED':
            return (
                <span style={{ backgroundColor: '#f44336', padding: '0.2rem', borderRadius: '5px', fontFamily: 'Quicksand', fontWeight: '600'}}>
                    Suspended
                </span>
            );
        case 'PENDING':
            return (
                <span style={{ backgroundColor: '#ffa726', padding: '0.2rem', borderRadius: '5px', fontFamily: 'Quicksand', fontWeight: '600'}}>
                    Pending
                </span>
            );
        default:
            return (
                <></>
            );
    }
};