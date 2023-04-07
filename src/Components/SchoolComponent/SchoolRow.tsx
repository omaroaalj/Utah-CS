import { TableRow } from "@mui/material";
import { FC, useContext, useState } from "react";
import PercentageChart from "../CellComponents/PercentageChart";
import { TextCell } from "../GeneralComponents";
import { Enrollment } from "../../Interface/Types";
import { findAttribute } from "../../Interface/AttributeFinder";
import Store from "../../Interface/Store";

type Props = {
    schoolEntry: (number | string)[];
    titleEntry: string[];
};

const SchoolRow: FC<Props> = ({ schoolEntry, titleEntry }: Props) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const store = useContext(Store);
    const schoolAttributeFinder = (attributeName: string) => findAttribute(attributeName, titleEntry, schoolEntry);

    return (
        <>
            <TableRow style={{ cursor: 'pointer' }}>

                <TextCell onClick={() => setIsExpanded(!isExpanded)} style={{ maxWidth: '20vw' }}>
                    {(schoolEntry[1])}
                </TextCell>
                <TextCell onClick={() => setIsExpanded(!isExpanded)}>
                    {schoolAttributeFinder('TOTAL: Total')}
                </TextCell>
                <TextCell>
                    <PercentageChart actualVal={schoolAttributeFinder(`${store.currentShownCSType}: Total`)} percentage={schoolAttributeFinder(`${store.currentShownCSType}: Total`) / schoolAttributeFinder('TOTAL: Total')} />
                </TextCell>
            </TableRow>

        </>


    );
};
export default SchoolRow;

const findSpecialCase = (input: Enrollment) => {
    return input.CSA.Total === 'n<10' || input.CSB.Total === 'n<10' || input.CSR.Total === 'n<10';
};
