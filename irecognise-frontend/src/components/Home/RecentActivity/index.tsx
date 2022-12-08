import React from "react";
import { StyledSectionHeading, StyledLink } from '../../reusable/styledText';

const RecentActivitySection: React.FC = () => {
    return (
        <div className="section">
            <StyledSectionHeading className="heading2">
                <div> Recent Activity </div>
                <StyledLink> See all </StyledLink>
            </StyledSectionHeading>
        </div>
    );
};

export default RecentActivitySection;
