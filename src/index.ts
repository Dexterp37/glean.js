/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Glean from "glean";
import Configuration from "config";

// Private Glean types to export.
import PingType from "pings";
import BooleanMetricType from "metrics/types/boolean";
import CounterMetricType from "metrics/types/counter";
import DatetimeMetricType from "metrics/types/datetime";
import StringMetricType from "metrics/types/string";
import UUIDMetricType from "metrics/types/uuid";

export = {
  /**
   * Initialize Glean. This method should only be called once, subsequent calls will be no-op.
   *
   * # Note
   *
   * Before this method is called Glean will not be able to upload pings or record metrics,
   * all such operations will be no-op.
   *
   * This is _not_ the way glean-core deals with this. It will record tasks performed before init
   * and flush them on init. We have a bug to figure out how to do that for Glean.js, Bug 1687491.
   *
   * @param applicationId The application ID (will be sanitized during initialization).
   * @param uploadEnabled Determines whether telemetry is enabled.
   *                      If disabled, all persisted metrics, events and queued pings (except
   *                      first_run_date) are cleared.
   * @param config Glean configuration options.
   *
   * @returns A promise that is resolved once initialize is completed.
   */
  async initialize(
    applicationId: string,
    uploadEnabled: boolean,
    config?: Configuration
  ): Promise<void> {
    await Glean.initialize(applicationId, uploadEnabled, config);
  },

  /**
   * Sets whether upload is enabled or not.
   *
   * When uploading is disabled, metrics aren't recorded at all and no data is uploaded.
   *
   * When disabling, all pending metrics, events and queued pings are cleared.
   *
   * When enabling, the core Glean metrics are recreated.
   *
   * If the value of this flag is not actually changed, this is a no-op.
   *
   * If Glean has not been initialized yet, this is also a no-op.
   *
   * @param flag When true, enable metric collection.
   *
   * @returns A promise that is resolved once setUploadEnabled is completed.
   */
  async setUploadEnabled(flag: boolean): Promise<void> {
    if (!Glean.initialized) {
      console.error(
        `Changing upload enabled before Glean is initialized is not supported.
        Pass the correct state into \`Glean.initialize\`.
        See documentation at https://mozilla.github.io/glean/book/user/general-api.html#initializing-the-glean-sdk`
      );
      return;
    }

    await Glean.setUploadEnabled(flag);
  },

  _private: {
    PingType,
    BooleanMetricType,
    CounterMetricType,
    DatetimeMetricType,
    StringMetricType,
    UUIDMetricType
  }
}
