# Platform.sh Visual Regression Testing

Performs visual regression testing using [BackstopJS](https://github.com/garris/BackstopJS).

Contains a base collection of configurations to run a visual regression test between a baseline/reference URL, and a 
test environment URL. Tests the baseline URL and test URL for a 200 response before initiating the test.

By default, will test the home page `/` of an environment and `a/path/to/nowhere/` to force a 404. 
You can add more locations to test by copying the [`default-paths.js`](./default-paths.js) file to `./.github/tests/vrt/` 
(or see `paths_location` option below) and renaming it `template-paths.js`. See comments at the top of that file for 
additional directions. Advanced scenario properties/options can be added.

## Inputs
* `baseline_url` - **REQUIRED**. Full URL to the "production" version of the site/project. This URL is used to create
  the reference set of images in the visual regression tests. It *must* include a trailing slash.
* `test_url` - **REQUIRED**. Full URL of the pull request environment that will be tested against the baseline. It *must* include a trailing slash.
*  `report_results` - Optional. Should the action report the results back to the calling workflow (true) or 
pass/fail directly (false)? _Default is false_.
* `paths_location` - Optional. Path to the template-paths.js file. _Default is `./.github/tests/vrt/` from the template's repository root_.
## Outputs
* `results` - String of `true`|`false` indicating if the visual regression test passed/failed. 
## Example Usage
```yaml
    - name: 'Visual Regression Testing'
      id: test-environment
      uses: platformsh/gha-vrt
      with:
        baseline_url: ${{ vars.baseline-url }}
        test_url: ${{ vars.target_url }}
        report_results: true
```
## Roadmap
* Add input for `*-paths.js` file instead of being statically named
* Implement `threshold` input
* Allow for overriding default viewports
