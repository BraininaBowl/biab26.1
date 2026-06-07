export default function (string) {
  let boldOn = false;
  let italicOn = false;
  let header1On = false;
  let header2On = false;
  let header3On = false;
  let header4On = false;
  let header5On = false;
  let header6On = false;
  let paragOn = false;


  const sections = string.split(/\s+/);
  sections.forEach((section, index) => {
    console.log(section);
    if (section.startsWith("http://") || section.startsWith("https://")) {
      sections[index] =
        `<a href="${section}" target="_blank" rel="noopener noreferrer">${section}</a>`;
    }

    if (section == "/n") {
      sections[index] = "<br>";
    }


    if (section == "*") {
      if (italicOn) {
        sections[index] = "</i>";
        italicOn = false;
      } else {
        sections[index] = "<i>";
        italicOn = true;
      }
    }
    if (section == "**") {
      if (boldOn) {
        sections[index] = "</b>";
        boldOn = false;
      } else {
        sections[index] = "<b>";
        boldOn = true;
      } 
    }

    if (section == "#") {
      if (header1On) {
        sections[index] = "</h1>";
        header1On = false;
      } else {
        sections[index] = "<h1>";
        header1On = true;
      }
    }
    if (section == "##") {
      if (header2On) {
        sections[index] = "</h2>";
        header2On = false;
      } else {
        sections[index] = "<h2>";
        header2On = true;
      }
    }
    if (section == "###") {
      if (header3On) {
        sections[index] = "</h3>";
        header3On = false;
      } else {
        sections[index] = "<h3>";
        header3On = true;
      }
    }
    if (section == "####") {
      if (header4On) {
        sections[index] = "</h4>";
        header4On = false;
      } else {
        sections[index] = "<h4>";
        header4On = true;
      }
    }
    if (section == "#####") {
      if (header5On) {
        sections[index] = "</h5>";
        header5On = false;
      } else {
        sections[index] = "<h5>";
        header5On = true;
      }
    }
    if (section == "######") {
      if (header6On) {
        sections[index] = "</h6>";
        header6On = false;
      } else {
        sections[index] = "<h6>";
        header6On = true;
      }
    }

    if (section == "#P#") {
        if (paragOn) {
          sections[index] = "</p>";
          paragOn = false;
        } else {
          sections[index] = "<p>";
          paragOn = true;
        }
      }
  
});
  return sections.join(" ");
}
