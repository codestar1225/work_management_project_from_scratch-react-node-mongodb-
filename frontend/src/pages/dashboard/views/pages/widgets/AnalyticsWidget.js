import React from 'react';
import { Card, CardBody, UncontrolledTooltip } from 'reactstrap';

import FA from 'react-fontawesome';

export default function AnalyticsWidget() {
  return (
    <Card>
      <CardBody>
        <div className="display-flex">
          <div className="text-muted">Conversions</div>
          <span style={{ marginLeft: 'auto' }} id="AnalyticsWidgetTooltip">
            <FA name="question-circle-o" />
          </span>
          <UncontrolledTooltip placement="top" target="AnalyticsWidgetTooltip">
            Monthly Conversions
          </UncontrolledTooltip>
        </div>
        <h3 className="mb-1 h2">678</h3>
        <div className="full-bleed m-t">
        </div>
      </CardBody>
    </Card>
  );
}
