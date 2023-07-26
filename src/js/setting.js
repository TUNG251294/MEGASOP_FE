import { defineComponent } from "vue";
import { axiosInstance } from "boot/axios";

import { exportFile, LocalStorage, useQuasar, Notify } from "quasar";
import { ref } from "vue";
export default defineComponent({
  name: "SettingPage",
  components: {},

  data: function () {
    return {
      // Consumer
      selectedFileLogoConsumer: [],
      selectedFileIconConsumer: [],
      selectedFileLandingPageConsumer: [],

      //Retailer
      selectedFileLogoRetailer: [],
      selectedFileIconRetailer: [],

      //consumer
      buttonInfo: true,

      //retailer
      buttonInfoRetailer: true,

      //email
      showButtonEmail: true,

      form: {
        appName: ref(""),
        appNameRetailer: ref(""),
        emailStaff: ref(""),
        emailRetailer: ref(""),
        logoConsumer: ref(""),
      },
      currentAppName: "",
      currentAppNameRetailer: "",

      tab: "consumer",
      changeImage: false,
      emailStaffError: ref(""),
      emailRetailerError: ref(""),
      isReadOnly: true,
      isReadOnlyRetailer: true,
      isReadOnlyEmail: true,
      isVisibleConsumer: false,
      isVisibleRetailer: false,
      isDisableEmail: false,
      isDisableInfo: false,
      isTouchedLogoConsumer: false,
      isTouchedIconConsumer: false,
      isTouchedLandingPageConsumer: false,
      isTouchedLogoRetailer: false,
      isTouchedIconRetailer: false,
      // enable-consumer
      enableLogo: false,
      enableAvatarLandingPage: false,
      enableIcon: false,
      // enable-retailer
      enableLogoRetailer: false,
      enableIconRetailer: false,
      isAdmin: true,
    };
  },
  computed: {
    // consumer

    isValidAppName() {
      if (this.form.appName.trim().length == 0) {
        return false;
      }
      return true;
    },

    isValidLogoImageConsumer() {
      if (this.selectedFileLogoConsumer.length > 0) {
        return true;
      }
      return false;
    },

    isValidIconImageConsumer() {
      if (this.selectedFileIconConsumer.length > 0) {
        return true;
      }
      return false;
    },

    isValidLandingPageImageConsumer() {
      if (this.selectedFileLandingPageConsumer.length > 0) {
        return true;
      }
      return false;
    },

    isValidToSend() {
      return (
        this.isValidAppName &&
        this.isValidLogoImageConsumer &&
        this.isValidIconImageConsumer &&
        // this.isValidLandingPageImageConsumer &&
        (this.isTouchedLogoConsumer ||
          this.isTouchedIconConsumer ||
          // this.isTouchedLandingPageConsumer ||
          this.currentAppName.trim() != this.form.appName.trim())
      );
    },

    // retailer

    isValidAppNameRetailer() {
      if (this.form.appNameRetailer.trim().length == 0) {
        return false;
      }
      return true;
    },

    isValidLogoImageRetailer() {
      if (this.selectedFileLogoRetailer.length > 0) {
        return true;
      }
      return false;
    },

    isValidIconImageRetailer() {
      if (this.selectedFileIconRetailer.length > 0) {
        return true;
      }
      return false;
    },

    isValidToSendRetailer() {
      return (
        this.isValidAppNameRetailer &&
        this.isValidLogoImageRetailer &&
        this.isValidIconImageRetailer &&
        (this.isTouchedLogoRetailer ||
          this.isTouchedIconRetailer ||
          this.currentAppNameRetailer.trim() !=
            this.form.appNameRetailer.trim())
      );
    },

    //email

    isValidEmailStaff() {
      if (this.form.emailStaff.trim().length == 0) {
        return false;
      }
      var reg = /^.{5,64}$/;
      return reg.test(this.form.emailStaff);
    },

    isValidEmailRetailer() {
      if (this.form.emailRetailer.trim().length == 0) {
        return false;
      }
      var reg = /^.{5,64}$/;
      return reg.test(this.form.emailRetailer);
    },

    isValidToSendEmail() {
      return this.isValidEmailStaff && this.isValidEmailRetailer;
    },
  },
  mounted: function () {
    this.getConsumer();
    this.getRetailer();
    this.getEmail();
    this.isAdmin = LocalStorage.getItem("a_st_t") == null;
    // this.convertImage();
  },
  methods: {
    // standard
    uuidv4: function () {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },

    // logo-consumer
    selectFileLogoConsumer: function () {
      document.getElementById("imageFileLogoConsumer").click();
    },

    onFileSelectedLogoConsumer: function (event) {
      var self = this;

      if (event != null) {
        self.isTouchedLogoConsumer = true;
        self.enableLogo = true;
      } else {
        self.enableLogo = false;
      }

      let files = event.target.files || event.dataTransfer.files;

      if (!files.length) {
        return false;
      }

      for (var i = 0; i < files.length; i++) {
        let file = files.item(i);
        self.createImageLogoConsumer(file);
      }
    },
    createImageLogoConsumer: function (file) {
      var self = this;
      let reader = new FileReader();
      reader.onload = (e) => {
        let dataURI = e.target.result;

        if (dataURI) {
          self.selectedFileLogoConsumer.push({
            id: self.uuidv4(),
            path: dataURI,
            file: file,
          });
          if (self.selectedFileLogoConsumer.length > 1) {
            return self.selectedFileLogoConsumer.splice(
              self.selectedFileLogoConsumer[0],
              1
            );
          }
        }
      };
      reader.readAsDataURL(file);
    },

    removeImageLogoConsumer: function (imageId) {
      var self = this;
      self.selectedFileLogoConsumer = self.selectedFileLogoConsumer.filter(
        (element) => {
          return element.id != imageId;
        }
      );
    },

    // icon-consumer
    selectFileIconConsumer: function () {
      document.getElementById("imageFileIconConsumer").click();
    },
    onFileSelectedIconConsumer: function (event) {
      var self = this;

      if (event != null) {
        self.isTouchedIconConsumer = true;
        self.enableIcon = true;
      } else {
        self.enableIcon = false;
      }

      let files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return false;
      }
      for (var i = 0; i < files.length; i++) {
        let file = files.item(i);
        self.createImageIconConsumer(file);
      }
    },

    createImageIconConsumer: function (file) {
      var self = this;
      let reader = new FileReader();
      reader.onload = (e) => {
        let dataURI = e.target.result;
        if (dataURI) {
          self.selectedFileIconConsumer.push({
            id: self.uuidv4(),
            path: dataURI,
            file: file,
          });
          if (self.selectedFileIconConsumer.length > 1) {
            return self.selectedFileIconConsumer.splice(
              self.selectedFileIconConsumer[0],
              1
            );
          }
        }
      };
      reader.readAsDataURL(file);
    },
    removeImageIconConsumer: function (imageId) {
      var self = this;
      self.selectedFileIconConsumer = self.selectedFileIconConsumer.filter(
        (element) => {
          return element.id != imageId;
        }
      );
    },

    // landing-page-consumer
    selectFileLandingPageConsumer: function () {
      document.getElementById("imageFileLandingPageConsumer").click();
    },
    onFileSelectedLandingPageConsumer: function (event) {
      var self = this;
      if (event != null) {
        self.isTouchedLandingPageConsumer = true;
        self.enableAvatarLandingPage = true;
      } else {
        self.enableIcon = false;
      }

      let files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return false;
      }

      for (var i = 0; i < files.length; i++) {
        let file = files.item(i);
        self.createImageLandingPageConsumer(file);
      }
    },
    createImageLandingPageConsumer: function (file) {
      var self = this;
      let reader = new FileReader();
      reader.onload = (e) => {
        let dataURI = e.target.result;
        if (dataURI) {
          self.selectedFileLandingPageConsumer.push({
            id: self.uuidv4(),
            path: dataURI,
            file: file,
          });
          if (self.selectedFileLandingPageConsumer.length > 1) {
            return self.selectedFileLandingPageConsumer.splice(
              self.selectedFileLandingPageConsumer[0],
              1
            );
          }
        }
      };
      reader.readAsDataURL(file);
    },
    removeImageLandingPageConsumer: function (imageId) {
      var self = this;
      self.selectedFileLandingPageConsumer =
        self.selectedFileLandingPageConsumer.filter((element) => {
          return element.id != imageId;
        });
    },

    // logo-Retailer
    selectFileLogoRetailer: function () {
      document.getElementById("imageFileLogoRetailer").click();
    },
    onFileSelectedLogoRetailer: function (event) {
      var self = this;

      if (event != null) {
        self.isTouchedLogoRetailer = true;
        self.enableLogoRetailer = true;
      }

      let files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return false;
      }

      for (var i = 0; i < files.length; i++) {
        let file = files.item(i);
        self.createImageLogoRetailer(file);
      }
    },
    createImageLogoRetailer: function (file) {
      var self = this;
      let reader = new FileReader();
      reader.onload = (e) => {
        let dataURI = e.target.result;
        if (dataURI) {
          self.selectedFileLogoRetailer.push({
            id: self.uuidv4(),
            path: dataURI,
            file: file,
          });
          if (self.selectedFileLogoRetailer.length > 1) {
            return self.selectedFileLogoRetailer.splice(
              self.selectedFileLogoRetailer[0],
              1
            );
          }
        }
      };
      reader.readAsDataURL(file);
    },
    removeImageLogoRetailer: function (imageId) {
      var self = this;
      self.selectedFileLogoRetailer = self.selectedFileLogoRetailer.filter(
        (element) => {
          return element.id != imageId;
        }
      );
    },

    // icon-Retailer
    selectFileIconRetailer: function () {
      document.getElementById("imageFileIconRetailer").click();
    },
    onFileSelectedIconRetailer: function (event) {
      var self = this;

      if (event != null) {
        self.isTouchedIconRetailer = true;
        self.enableIconRetailer = true;
      }

      let files = event.target.files || event.dataTransfer.files;

      if (!files.length) {
        return false;
      }

      for (var i = 0; i < files.length; i++) {
        let file = files.item(i);
        self.createImageIconRetailer(file);
      }
    },
    createImageIconRetailer: function (file) {
      var self = this;
      let reader = new FileReader();
      reader.onload = (e) => {
        let dataURI = e.target.result;
        if (dataURI) {
          self.selectedFileIconRetailer.push({
            id: self.uuidv4(),
            path: dataURI,
            file: file,
          });
          if (self.selectedFileIconRetailer.length > 1) {
            return self.selectedFileIconRetailer.splice(
              self.selectedFileIconRetailer[0],
              1
            );
          }
        }
      };
      reader.readAsDataURL(file);
    },
    removeImageIconRetailer: function (imageId) {
      var self = this;
      self.selectedFileIconRetailer = self.selectedFileIconRetailer.filter(
        (element) => {
          return element.id != imageId;
        }
      );
    },

    // consumer
    openButton: function (reload = true) {
      var self = this;
      self.showButton = !self.showButton;
      self.buttonInfo = !self.buttonInfo;
      self.isReadOnly = !self.isReadOnly;
      self.isVisibleConsumer = !self.isVisibleConsumer;
      self.isDisableEmail = !self.isDisableEmail;
      if (self.buttonInfo && reload) {
        window.location.reload();
      }
    },

    // retailer
    openButtonRetailer: function (reload = true) {
      var self = this;
      self.showButtonRetailer = !self.showButtonRetailer;
      self.buttonInfoRetailer = !self.buttonInfoRetailer;
      self.isReadOnlyRetailer = !self.isReadOnlyRetailer;
      self.isVisibleRetailer = !self.isVisibleRetailer;
      self.isDisableEmail = !self.isDisableEmail;
      if (self.buttonInfoRetailer && reload) {
        window.location.reload();
      }
    },

    //email
    openButtonEmail: function () {
      var self = this;
      self.showButtonEmail = !self.showButtonEmail;
      self.isReadOnlyEmail = !self.isReadOnlyEmail;
      self.isDisableInfo = !self.isDisableInfo;
      self.form.emailStaff = "Megasop Support";
      self.form.emailRetailer = "Megasop Support";
      if (self.showButtonEmail == true) {
        self.getEmail();
      }
      // test
      // self.convertImage();
    },

    //validate

    validateEmailStaffError: function (event) {
      var self = this;
      if (event != null) {
        if (self.form.emailStaff.trim().length == 0) {
          self.form.emailStaff = "Megasop Support";
          self.emailStaffError = "";
          return;
        }
      }

      if (self.form.emailStaff.trim().length == 0) {
        // self.emailStaffError = "This field is required !";
        self.form.emailStaff = "Megasop Support";
        self.emailStaffError = "";
        return;
      }
      if (!self.isValidEmailStaff) {
        self.emailStaffError = this.$t(
          "setting.please_enter_name_with_limit_character"
        );
        return;
      }
      self.emailStaffError = "";
    },

    validateEmailRetailerError: function (event) {
      var self = this;
      if (event != null) {
        if (self.form.emailRetailer.trim().length == 0) {
          self.form.emailRetailer = "Megasop Support";
          self.emailRetailerError = "";
          return;
        }
      }
      if (self.form.emailRetailer.trim().length == 0) {
        // self.emailRetailerError = "This field is required !";
        self.form.emailRetailer = "Megasop Support";
        self.emailRetailerError = "";
        return;
      }
      if (!self.isValidEmailRetailer) {
        self.emailRetailerError = this.$t(
          "setting.please_enter_name_with_limit_character"
        );
        return;
      }
      self.emailRetailerError = "";
    },

    // consumer

    onSubmitConsumer: function () {
      var self = this;
      let inputData = {};

      inputData["appName"] = self.form.appName;
      if (self.enableAvatarLandingPage) {
        inputData["avatarLandingPage"] =
          self.selectedFileLandingPageConsumer[0].path;
        inputData["enableAvatarLandingPage"] = true;
      } else {
        inputData["enableAvatarLandingPage"] = false;
      }

      if (self.enableIcon) {
        inputData["icon"] = self.selectedFileIconConsumer[0].path;
        inputData["enableIcon"] = true;
      } else {
        inputData["enableIcon"] = false;
      }

      if (self.enableLogo) {
        inputData["logo"] = self.selectedFileLogoConsumer[0].path;
        inputData["enableLogo"] = true;
      } else {
        inputData["enableLogo"] = false;
      }

      inputData["key"] = self.tab;

      axiosInstance
        .post("/settings/consumer", inputData)
        .then(() => {
          Notify.create({
            message: this.$t("setting.update_information_success"),
            type: "positive",
            position: "top-right",
            // classes: "notify-custom",
          });
          self.openButton(false);
        })
        .catch(() => {
          // Notify.create({
          //   message: `<div style="width:380px; height:40px; text-align:center; line-height:40px; padding:0; cursor:pointer"> <p>Xác nhận</p> </div>`,
          //   color: "primary",
          //   textColor: "white",
          //   position: "center",
          //   html: true,
          // });

          // Notify.create({
          //   message: `
          //   <div style="width:380px; height:136px; padding: 24px">
          //   <p style="color: #018ABE; font-size:18px; font-weight:bold">Không thể lưu thông tin</p> <p  style="font-size:14px">Hệ thống tạm thời không thể truy cập.
          //   Vui lòng thử lại sau một lúc!</p>
          //   </div> `,
          //   position: "center",
          //   color: "white",
          //   html: true,
          //   textColor: "black",
          // });

          Notify.create({
            position: "top-right",
            message: this.$t("setting.update_information_fail"),
            type: "negative",
          });
        });
    },

    // retailer
    onSubmitRetailer: function () {
      var self = this;
      let inputData = {};
      inputData["appName"] = self.form.appNameRetailer;
      // inputData["avatarLandingPage"] =
      //   self.selectedFileLandingPageConsumer[0].path;

      if (self.enableIconRetailer) {
        inputData["icon"] = self.selectedFileIconRetailer[0].path;
        inputData["enableIcon"] = true;
      } else {
        inputData["enableIcon"] = false;
      }

      if (self.enableLogoRetailer) {
        inputData["logo"] = self.selectedFileLogoRetailer[0].path;
        inputData["enableLogo"] = true;
      } else {
        inputData["enableLogo"] = false;
      }

      inputData["key"] = self.tab;

      axiosInstance
        .post("/settings/retailer", inputData)
        .then(() => {
          Notify.create({
            message: this.$t("setting.update_information_success"),
            type: "positive",
            position: "top-right",
            // classes: "notify-custom",
          });

          self.openButtonRetailer(false);
        })

        .catch(() => {
          // Notify.create({
          //   message: `<div style="width:380px; height:40px; text-align:center; line-height:40px; padding:0;cursor:pointer"> <p>Xác nhận</p> </div>`,
          //   color: "primary",
          //   textColor: "white",
          //   position: "center",
          //   html: true,
          // });

          // Notify.create({
          //   message: `
          //   <div style="width:380px; height:136px; padding: 24px">
          //   <p style="color: #018ABE; font-size:18px; font-weight:bold">Không thể lưu thông tin</p> <p  style="font-size:14px">Hệ thống tạm thời không thể truy cập.
          //   Vui lòng thử lại sau một lúc!</p>
          //   </div> `,
          //   position: "center",
          //   color: "white",
          //   html: true,
          //   textColor: "black",
          // });

          Notify.create({
            position: "top-right",
            message: this.$t("setting.update_information_fail"),
            type: "negative",
          });
        });
    },

    // email
    onSubmitEmail: function () {
      var self = this;
      let inputData = {};
      inputData["emailRetailer"] = self.form.emailRetailer;
      inputData["emailStaff"] = self.form.emailStaff;

      axiosInstance
        .post("/settings/email", inputData)
        .then(() => {
          Notify.create({
            message: this.$t("setting.update_email_success"),
            type: "positive",
            position: "top-right",
            // actions: [{ icon: "close", color: "black" }],

            // classes: "notify-custom",
          });
          self.openButtonEmail();
        })
        .catch(() => {
          // Notify.create({
          //   message: `<div style="width:380px; height:40px; text-align:center; line-height:40px; padding:0;cursor:pointer"> <p>Xác nhận</p> </div>`,
          //   color: "primary",
          //   textColor: "white",
          //   position: "center",
          //   html: true,
          // });

          // Notify.create({
          //   message: `
          //   <div style="width:380px; height:136px; padding: 24px">
          //   <p style="color: #018ABE; font-size:18px; font-weight:bold">Không thể lưu thông tin</p> <p  style="font-size:14px">Hệ thống tạm thời không thể truy cập.
          //   Vui lòng thử lại sau một lúc!</p>
          //   </div> `,
          //   position: "center",
          //   color: "white",
          //   html: true,
          //   textColor: "black",
          // });
          Notify.create({
            position: "top-right",
            message: this.$t("setting.update_information_fail"),
            type: "negative",
          });
        });
    },

    getConsumer: function () {
      var self = this;
      axiosInstance.get("/settings/consumer").then((response) => {
        self.form.appName = response.data.data.setting.appName;
        self.currentAppName = self.form.appName;
        if (response.data.data.setting.logo.trim() != "") {
          self.selectedFileLogoConsumer.push({
            path: response.data.data.setting.logo,
          });
        }

        if (response.data.data.setting.icon.trim() != "") {
          self.selectedFileIconConsumer.push({
            path: response.data.data.setting.icon,
          });
        }

        if (response.data.data.setting.avatarLandingPage.trim() != "") {
          self.selectedFileLandingPageConsumer.push({
            path: response.data.data.setting.avatarLandingPage,
          });
        }
      });
    },

    getRetailer: function () {
      var self = this;
      axiosInstance.get("/settings/retailer").then((response) => {
        self.form.appNameRetailer = response.data.data.setting.appName;
        self.currentAppNameRetailer = self.form.appNameRetailer;

        if (response.data.data.setting.logo.trim() != "") {
          self.selectedFileLogoRetailer.push({
            path: response.data.data.setting.logo,
          });
        }

        if (response.data.data.setting.icon.trim() != "") {
          self.selectedFileIconRetailer.push({
            path: response.data.data.setting.icon,
          });
        }
      });
    },

    getEmail: function () {
      var self = this;
      axiosInstance.get("/settings/email").then((response) => {
        self.form.emailStaff = response.data.data.setting.emailStaff;
        self.form.emailRetailer = response.data.data.setting.emailRetailer;
      });
    },

    getBase64Image: function (url) {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        console.log(dataURL);
      };
      img.src = url;
    },

    convertImage: function () {
      var self = this;
      console.log(`${self.selectedFileLogoConsumer[0].path}`);
      console.log(self.getBase64Image(self.selectedFileLogoConsumer[0].path));
      console.log(
        self.getBase64Image(
          "https://play-lh.googleusercontent.com/2gk4MOJoUf_yqndIXUxiVuVSFhecQBReW1jbZyEvKVU3nslC66_0l1iBFggqPjbkiA"
        )
      );
    },
  },
});
