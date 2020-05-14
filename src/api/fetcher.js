import config from "./config";
import axios from "axios";

export function getPoints(language, path, parameters) {
  return axios.get(config.API_BASE_URL + path, {
    parameters: parameters
  })
    .then(function (response) {
      console.log("data fetched")
      return generatePoints(response.data, language);
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
}

function generatePoints(res, language) {
  var points = [];

  res.data.forEach((el, i) => {
    if (el.smetadata.online == true) {
      var point = parsePointData(i, el);

      switch (language) {
        case "en":
          point.sector = point.sectorEn;
          point.description = point.descriptionEn;
          break;
        case "de":
          point.sector = point.sectorDe;
          point.description = point.descriptionDe;
          break;
        case "it":
          point.sector = point.sectorIt;
          point.description = point.descriptionIt;
          break;
      }

      points.push(point);
    }
  });

  return points;
}

function parsePointData(index, element) {
  var meta = element.smetadata

  var industryId
  var activityTypeId

  switch (meta.industry.trim().toLowerCase()) {
    case "architecture":
      industryId = 0;
      break;
    case "software & games":
      industryId = 1;
      break;
    case "design":
      industryId = 2;
      break;
    case "publishing & press":
      industryId = 3;
      break;
    case "visual arts":
      industryId = 4;
      break;
    case "film & video":
      industryId = 5;
      break;
    case "radio & tv":
      industryId = 6;
      break;
    case "music":
      industryId = 7;
      break;
    case "performing arts":
      industryId = 8;
      break;
    case "handicraft":
      industryId = 9;
      break;
    case "advertising":
      industryId = 10;
      break;
    default:
      industryId = 10;
      console.log("ERROR IN INDUSTRY NAME:" + meta.industry);
  }

  switch (meta.legal_form.trim().toLowerCase()) {
    case "freelance":
      activityTypeId = 0;
      break;
    case "company":
      activityTypeId = 1;
      break;
    case "association":
      activityTypeId = 2;
      break;
    case "entity":
      activityTypeId = 3;
      break;
  }

  var protocolRegex = /^(http[s]?:\/\/)/gm;
  var fb;
  var ig;
  var linkedin;
  var website;
  if (meta.fb) {
    fb = meta.fb.replace(protocolRegex, "");
  }
  if (meta.ig) {
    ig = meta.ig.replace(protocolRegex, "");
  }
  if (meta.linkedin) {
    console.log(meta.linkedin)
    linkedin = meta.linkedin.replace(protocolRegex, "");
  }
  if (meta.website) {
    website = meta.website.replace(protocolRegex, "");
  }

  return {
    id: index,
    name: meta.name,
    industrie: industryId,
    sectorEn: meta.sector.en,
    sectorDe: meta.sector.de,
    sectorIt: meta.sector.it,
    activity: activityTypeId,
    coords: [element.scoordinate.y, element.scoordinate.x],
    logo: meta.logo,
    descriptionEn: meta.description.en,
    descriptionDe: meta.description.de,
    descriptionIt: meta.description.it,
    facebook: fb,
    instagram: ig,
    linkedin: linkedin,
    website: website,
    phone: meta.phone_number,
    mail: meta.email,
    active: true
  }
}