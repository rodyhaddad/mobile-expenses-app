angular.module('expenses-app')

.directive('uwChoosePicture', () => {
    return {
        restrict: 'E',
        template: `
            <style>
                uw-choose-picture {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.05);
                }
                uw-choose-picture .choose-picture {
                    width: 100%;
                }
                uw-choose-picture .choose-picture div {
                    width: 100%;
                    height: 100%;
                    font-size: 36px;
                    color: rgba(124, 124, 124, 0.58);
                    text-align: center;
                    line-height: 1.5em;
                }
                uw-choose-picture .choose-picture input {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    opacity: 0;
                }
                uw-choose-picture .choice-done,
                uw-choose-picture .choice-done ion-scroll {
                    width: 100%;
                    height: 100%
                }
            </style>
            <div class="choose-picture" ng-if="!uwChoosePicture.choice">
                <div class="col">Click to choose and upload the picture of your expense</div>
                <input type="file" uw-choose-picture-on-choice="uwChoosePicture.onChoice($uwValue)" />
            </div>
            <div class="choice-done" ng-if="uwChoosePicture.choice" on-hold="uwChoosePicture.choiceActions()">
                <ion-scroll zooming="true" direction="xy">
                    <div>
                        <img ng-src="{{ uwChoosePicture.choice }}" />
                    </div>
                </ion-scroll>
            </div>
        `,
        link(scope, el) {
            el.addClass('row').addClass('row-center');
        },
        controller($ionicActionSheet) {
            this.choice = null;
            this.onChoice = (imageData) => {
                this.choice = imageData;
            };
            this.choiceActions = () => {
                $ionicActionSheet.show({
                    destructiveText: 'Remove Image',
                    destructiveButtonClicked: () => {
                        this.choice = null;
                        return true;
                    },
                    cancelText: 'Cancel',
                })
            };
        },
        controllerAs: "uwChoosePicture"
    };
})

.directive('uwChoosePictureOnChoice', () => {
    return {
        link(scope, el, attrs) {
            el.on('change', () => {
                if (el[0].files[0]) {
                    var reader = new FileReader();

                    reader.onload = () => {
                        scope.$evalAsync(() => {
                            scope.$eval(attrs.uwChoosePictureOnChoice, {$uwValue: reader.result});
                        });
                    };

                    reader.readAsDataURL(el[0].files[0]);
                }
            });
        }
    };
});