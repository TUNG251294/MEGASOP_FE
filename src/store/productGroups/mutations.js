import { LocalStorage } from 'quasar'
import { Constants } from 'src/boot/Constants'

export const ADD_PRODUCT_IN_GROUPS = (state, { product }) => {
  let productInGroups = state.products.find(item => {
    return item.product.productVariationId == product.productVariationId
  })

  if (productInGroups) {
    return
  }

  state.products.push({
    product
  })

  LocalStorage.set(Constants.PRODUCT_CATEGORY, state.products)
}

export const ADD_TO_GROUPS = (
  state,
  { nodeLv0Id, nodeLv1Id, nodeLv2Id, product, category }
) => {
  if (state.productGroups.length == 0) {
    state.productGroups.push(category)
    LocalStorage.set(Constants.PRODUCT_GROUPS, state.productGroups)
    return
  }

  let nodeLv0 = state.productGroups.find(item => item.id == nodeLv0Id)
  if (nodeLv0 == undefined) {
    state.productGroups.push(category)
    LocalStorage.set(Constants.PRODUCT_GROUPS, state.productGroups)
    return
  }

  let nodeLv1 = nodeLv0.children.find(item => item.id == nodeLv1Id)
  if (nodeLv1 == undefined) {
    nodeLv0.children.push(category.children[0])
    LocalStorage.set(Constants.PRODUCT_GROUPS, state.productGroups)
    return
  }

  let nodeLv2 = nodeLv1.children.find(item => item.id == nodeLv2Id)
  if (nodeLv2 == undefined) {
    nodeLv1.children.push(category.children[0].children[0])
    LocalStorage.set(Constants.PRODUCT_GROUPS, state.productGroups)
    return
  }

  let existedProduct = nodeLv2.children.find(item => item.id == product.id)
  if (existedProduct == undefined) {
    nodeLv2.children.push(product)
    LocalStorage.set(Constants.PRODUCT_GROUPS, state.productGroups)
  }
}

export const REMOVE_PRODUCT = (state, { product }) => {
  let nodeLv0 = state.productGroups.find(item => item.id == product.nodeLv0Id)

  if (product.nodeLv1Id == 0 && product.nodeLv2Id == 0) {
    nodeLv0.children = nodeLv0.children.filter(
      item => item.productVariationId != product.productVariationId
    )
    if (nodeLv0.children.length == 0) {
      state.productGroups = state.productGroups.filter(
        item => item.id != product.nodeLv0Id
      )
    }
    LocalStorage.set(Constants.PRODUCT_GROUPS, state.productGroups)
    return
  }

  let nodeLv1 = nodeLv0.children.find(item => item.id == product.nodeLv1Id)
  if (product.nodeLv2Id == 0) {
    nodeLv1.children = nodeLv1.children.filter(
      item => item.productVariationId != product.productVariationId
    )
    if (nodeLv1.children.length == 0) {
      nodeLv0.children = nodeLv0.children.filter(
        item => item.id != product.nodeLv1Id
      )
    }

    if (nodeLv0.children.length == 0) {
      state.productGroups = state.productGroups.filter(
        item => item.id != product.nodeLv0Id
      )
    }
    LocalStorage.set(Constants.PRODUCT_GROUPS, state.productGroups)
    return
  }

  let nodeLv2 = nodeLv1.children.find(item => item.id == product.nodeLv2Id)
  nodeLv2.children = nodeLv2.children.filter(
    item => item.productVariationId != product.productVariationId
  )
  if (nodeLv2.children.length == 0) {
    nodeLv1.children = nodeLv1.children.filter(
      item => item.id != product.nodeLv2Id
    )
  }

  if (nodeLv1.children.length == 0) {
    nodeLv0.children = nodeLv0.children.filter(
      item => item.id != product.nodeLv1Id
    )
  }

  if (nodeLv0.children.length == 0) {
    state.productGroups = state.productGroups.filter(
      item => item.id != product.nodeLv0Id
    )
  }

  LocalStorage.set(Constants.PRODUCT_GROUPS, state.productGroups)
}

export const SET_GROUPS = (state, groups) => {
  state.groups = groups
}

export const SET_PRODUCT_GROUPS = (state, groups) => {
  state.productGroups = groups
}

export const SET_PRODUCTS = (state, products) => {
  state.products = products
}

export const SET_LEVEL_GROUPS = (state, groups) => {
  state.levelGroups = groups
}

export const CONFIRM_ADD_GROUP = (state, { index, group }) => {
  state.productGroups = []
  LocalStorage.set(Constants.PRODUCT_GROUPS, state.productGroups)

  state.groups.push({
    index,
    group
  })

  LocalStorage.set(Constants.GROUPS, state.groups)
}

export const UPDATE_DESCRIPTION = (state, { node, value }) => {
  let groups = state.groups[node.index - 1]
  let nodeLv0 = groups.group.find(item => item.id == node.nodeLv0Id)
  let leaf
  if (node.nodeLv1Id == 0) {
    leaf = nodeLv0.children.find(item => item.id == node.id)
  } else {
    let nodeLv1 = nodeLv0.children.find(item => item.id == node.nodeLv1Id)
    if (node.nodeLv2Id == 0) {
      leaf = nodeLv1.children.find(item => item.id == node.id)
    } else {
      let nodeLv2 = nodeLv1.children.find(item => item.id == node.nodeLv2Id)
      leaf = nodeLv2.children.find(item => item.id == node.id)
    }
  }

  leaf.description = value
  state.groups[node.index - 1] = groups
  LocalStorage.set(Constants.GROUPS, state.groups)
}

export const CLEAR_PRODUCT_GROUPS = state => {
  state.productGroups = []
  LocalStorage.set(Constants.PRODUCT_GROUPS, state.productGroups)
}

export const UPDATE_LEVEL_GROUPS = (state, { index, productIndex }) => {
  let products

  products = state.products.filter(item => item.product.index == productIndex)

  if (state.levelGroups.length > 0) {
    state.levelGroups.forEach(element => {
      let obj = {
        products: products,
        productIndex: productIndex,
        fromValue: '',
        fixValue: '',
        toValue: '',
        rewards: [],
        descreaseValue: ''
      }
      element.groups.push(obj)
    })
  } else {
    let obj = {
      products: products,
      productIndex: productIndex,
      fromValue: '',
      fixValue: '',
      toValue: '',
      rewards: [],
      descreaseValue: ''
    }
    state.levelGroups.push({
      index,
      groups: [obj]
    })
  }
  LocalStorage.set(Constants.LEVEL_GROUPS, state.levelGroups)
}

export const ADD_NEW_LEVEL_GROUP = (state, { index, productIndex }) => {
  let groups = []
  for (let i = 1; i < productIndex; i++) {
    let products = state.products.filter(item => item.product.index == i)
    let obj = {
      products: products,
      productIndex: i,
      rewards: [],
      fixValue: '',
      fromValue: '',
      toValue: '',
      descreaseValue: ''
    }
    groups.push(obj)
  }
  state.levelGroups.push({
    index,
    groups: groups
  })
  LocalStorage.set(Constants.LEVEL_GROUPS, state.levelGroups)
}

export const REMOVE_LEVEL_GROUP = (state, { index }) => {
  state.levelGroups = state.levelGroups.filter(item => item.index != index)
  LocalStorage.set(Constants.LEVEL_GROUPS, state.levelGroups)
}

export const UPDATE_DESCREASE_VALUE = (
  state,
  { index, group, product, value }
) => {
  let levelGroups = state.levelGroups
  let findingGroup = levelGroups.find(item => item.index == group.index)
  let findingProduct = findingGroup.groups[index].products.find(
    item => item.product.id == product.id
  )
  findingProduct.product.descreaseUnit = value

  state.levelGroups = levelGroups
  LocalStorage.set(Constants.LEVEL_GROUPS, state.levelGroups)
}

export const UPDATE_FIX_VALUE = (state, { index, productIndex, value }) => {
  let levelGroups = state.levelGroups
  let levelGroup = levelGroups[index]
  let group = levelGroup.groups[productIndex]
  group.fixValue = value
  levelGroup.groups[productIndex] = group
  levelGroups[index] = levelGroup
  state.levelGroups = levelGroups
  LocalStorage.set(Constants.LEVEL_GROUPS, state.levelGroups)
}

export const UPDATE_FROM_VALUE = (state, { index, productIndex, value }) => {
  let levelGroups = state.levelGroups
  let levelGroup = levelGroups[index]
  let group = levelGroup.groups[productIndex]
  group.fromValue = value
  levelGroup.groups[productIndex] = group
  levelGroups[index] = levelGroup
  state.levelGroups = levelGroups
  LocalStorage.set(Constants.LEVEL_GROUPS, state.levelGroups)
}

export const UPDATE_TO_VALUE = (state, { index, productIndex, value }) => {
  let levelGroups = state.levelGroups
  let levelGroup = levelGroups[index]
  let group = levelGroup.groups[productIndex]
  group.toValue = value
  levelGroup.groups[productIndex] = group
  levelGroups[index] = levelGroup
  state.levelGroups = levelGroups
  LocalStorage.set(Constants.LEVEL_GROUPS, state.levelGroups)
}

export const CONFIRM_BACK = () => {
  LocalStorage.remove(Constants.PRODUCT_GROUPS)
  LocalStorage.remove(Constants.PRODUCT_CATEGORY)
  LocalStorage.remove(Constants.GROUPS)
  LocalStorage.remove(Constants.LEVEL_GROUPS)
}

export const UPDATE_DESCREASE_GROUP_VALUE = (
  state,
  { index, productIndex, value }
) => {
  let levelGroups = state.levelGroups
  let levelGroup = levelGroups[index]
  let group = levelGroup.groups[productIndex]
  group.descreaseValue = value
  levelGroup.groups[productIndex] = group
  levelGroups[index] = levelGroup
  state.levelGroups = levelGroups
  LocalStorage.set(Constants.LEVEL_GROUPS, state.levelGroups)
}

export const SET_REWARD_GROUPS = (state, rewards) => {
  state.rewards = rewards
}

export const ADD_PRESENT_TO_GROUP = (
  state,
  { levelGroupIndex, groupId, presents }
) => {
  let levelGroups = state.levelGroups
  let levelGroup = levelGroups.find(item => item.index == levelGroupIndex)
  let group = levelGroup.groups[groupId]
  presents.forEach(item => {
    let reward = group.rewards.find(
      element => element.productVariationId == item.productVariationId
    )
    if (reward) {
      reward.unitAmount += 1
    } else {
      group.rewards.push(item)
    }
  })
  levelGroup.groups[groupId] = group
  state.levelGroups = levelGroups
  LocalStorage.set(Constants.LEVEL_GROUPS, state.levelGroups)
}

export const CHANGE_AMOUNT_REWARD = (
  state,
  { groupId, levelGroupIndex, presentId, value }
) => {
  let levelGroups = state.levelGroups
  let levelGroup = levelGroups.find(item => item.index == levelGroupIndex)
  let group = levelGroup.groups[groupId]
  let reward = group.rewards.find(item => item.id == presentId)
  reward.unitAmount = value
  levelGroup.groups[groupId] = group
  state.levelGroups = levelGroups
  LocalStorage.set(Constants.LEVEL_GROUPS, state.levelGroups)
}

export const REMOVE_PRESENT_FROM_GROUP = (
  state,
  { levelGroupIndex, groupId, presentId }
) => {
  let levelGroups = state.levelGroups
  let levelGroup = levelGroups.find(item => item.index == levelGroupIndex)
  let group = levelGroup.groups[groupId]
  group.rewards = group.rewards.filter(
    item => item.productVariationId != presentId
  )
  levelGroup.groups[groupId] = group
  state.levelGroups = levelGroups
  LocalStorage.set(Constants.LEVEL_GROUPS, state.levelGroups)
}

export const REMOVE_PRODUCT_FROM_GROUP = (state, { product }) => {
  let productGroup = state.groups.find(item => item.index == product.index)
  let groups = productGroup.group
  let nodeLv0s = groups.find(item => item.id == product.nodeLv0Id)
  if (product.nodeLv1Id == 0) {
    nodeLv0s.children = nodeLv0s.children.filter(item => item.id != product.id)
  } else {
    let nodeLv1s = nodeLv0s.children.find(item => item.id == product.nodeLv1Id)
    if (product.nodeLv2Id == 0) {
      nodeLv1s.children = nodeLv1s.children.filter(
        item => item.id != product.id
      )
    } else {
      let nodeLv2s = nodeLv1s.children.find(
        item => item.id == product.nodeLv2Id
      )
      nodeLv2s.children = nodeLv2s.children.filter(
        item => item.id != product.id
      )
      if (nodeLv2s.children.length == 0) {
        nodeLv1s.children = nodeLv1s.children.filter(
          item => item.id != product.nodeLv2Id
        )
      }
    }
    if (nodeLv1s.children.length == 0) {
      nodeLv0s.children = nodeLv0s.children.filter(
        item => item.id != product.nodeLv1Id
      )
    }
  }

  if (nodeLv0s.children.length == 0) {
    groups = groups.filter(item => item.id != product.nodeLv0Id)
  }

  if (groups.length == 0) {
    state.groups = state.groups.filter(item => item.index != product.index)
  } else {
    productGroup.group = groups
  }

  LocalStorage.set(Constants.GROUPS, state.groups)

  let products = state.products
  products = products.filter(
    item => item.product.productVariationId != product.productVariationId
  )
  state.products = products
  LocalStorage.set(Constants.PRODUCT_CATEGORY, state.products)

  let levelGroups = state.levelGroups
  levelGroups.forEach(item => {
    let groups = item.groups
    let index = item.index
    groups.forEach((node, i) => {
      node.products = node.products.filter(
        pr => pr.product.productVariationId != product.productVariationId
      )
      if (node.products.length == 0) {
        groups.splice(i, 1)
      }
    })
    item.groups = groups
    if (item.groups.length == 0) {
      levelGroups = levelGroups.filter(gr => gr.index != index)
    }
  })
  state.levelGroups = levelGroups
  LocalStorage.set(Constants.LEVEL_GROUPS, state.levelGroups)
}

export const ADD_PRODUCT_INTO_GROUP = (
  state,
  { index, products, category }
) => {
  let groups = state.groups
  let group = groups[index - 1].group
  state.productGroups = []
  LocalStorage.set(Constants.PRODUCT_GROUPS, state.productGroups)
  for (let i = 0; i < products.length; i++) {
    let pro = products[i]
    state.products.push({ product: pro })
    if (pro.index != index) {
      continue
    }
    let levelGroups = state.levelGroups
    let levelGroupsLength = levelGroups.length

    for (let j = 0; j < levelGroupsLength; j++) {
      let levelGroup = levelGroups[j].groups[index - 1]
      let levelGroupProducts = levelGroup.products
      levelGroupProducts.push({ product: pro })
    }

    let nodeLv0 = group.find(item => item.id == pro.nodeLv0Id)
    if (nodeLv0 == undefined) {
      group.push(category[i])
      continue
    }
    let nodeLv1 = nodeLv0.children.find(item => item.id == pro.nodeLv1Id)
    if (nodeLv1 == undefined) {
      if (nodeLv0.children == null) {
        nodeLv0.children = []
      }
      nodeLv0.children.push(category[i].children[0])
      continue
    }
    let nodeLv2 = nodeLv1.children.find(item => item.id == pro.nodeLv2Id)
    if (nodeLv2 == undefined) {
      if (nodeLv1.children == null) {
        nodeLv1.children = []
      }
      nodeLv1.children.push(category[i].children[0].children[0])
      continue
    }
    nodeLv2.children.push(pro)
  }
  LocalStorage.set(Constants.PRODUCT_CATEGORY, state.products)
  LocalStorage.set(Constants.GROUPS, state.groups)
  LocalStorage.set(Constants.LEVEL_GROUPS, state.levelGroups)
}
