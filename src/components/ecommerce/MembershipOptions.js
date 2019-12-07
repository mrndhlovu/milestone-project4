import React from "react";

import { Grid } from "semantic-ui-react";

import PageHeader from "../sharedComponents/PageHeader";
import { getPageId } from "../../utils/urls";
import { Membership } from "./Membership";
import { MEMBERSHIP_TYPE } from "../../constants/constants";

const MembershipOptions = ({
  memberships,
  handleSelectMembership,
  buttonTextPro,
  buttonTextFree,
  history,
  isAuthenticated,
  allAccess
}) => {
  const freeMembership = memberships[0];
  const proMembership = memberships[1];

  return (
    <div data-test-id="membership-options">
      <PageHeader
        pageId={getPageId()}
        buttonId="file-ticket"
        dataTestId="pricing-header"
      />

      <Grid stackable columns="equal" style={{ paddingTop: 50 }}>
        <Grid.Row data-test-id="membership-grid-container">
          <Membership
            membership={freeMembership}
            buttonText={buttonTextFree}
            isAuthenticated={isAuthenticated}
            handleSelectMembership={handleSelectMembership}
            history={history}
            allAccess={allAccess}
            membershipType={MEMBERSHIP_TYPE.free}
          />

          <Membership
            membership={proMembership}
            buttonText={buttonTextPro}
            isAuthenticated={isAuthenticated}
            handleSelectMembership={handleSelectMembership}
            history={history}
            allAccess={allAccess}
            membershipType={MEMBERSHIP_TYPE.pro}
          />
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default MembershipOptions;
