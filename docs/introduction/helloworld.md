---
category: StarPort
order: 3
title: Hello World
---

让你的区块链可以说出Hello World, 开发者需要对protocal buffer文件进行修改，创建一个keeper query函数并返回数据，并对这个query函数进行注册。在protocal buffer文件中包含原型rpc属性，其定义了Cosmos SDK的query，而其中的message则定义了消息的数据类。
无论是query还是message都是由keeper函数进行处理。

现在我们创建一个`posts` query，并定义title和body两个字段：

```bash
starport query posts --response title,body
```

`starport query`命令行会修改（创建）如下文件：

* 修改 proto/blog/query.proto
* 创建 x/blog/keeper/grpc_query_posts.go
* 修改 x/blog/client/cli/query.go
* 创建 x/blog/client/cli/query_posts.go

## 分析代码

现在开始对这些代码进行解析，看看cosmos是如何处理消息请求的。

### proto/blog/query.proto

```go
syntax = "proto3";
package example.blog.blog;

import "google/api/annotations.proto";
import "cosmos/base/query/v1beta1/pagination.proto";
// this line is used by starport scaffolding # 1
option go_package = "github.com/example/blog/x/blog/types";
// Query defines the gRPC querier service.
service Query {
    // this line is used by starport scaffolding # 2
        // Queries a list of posts items.
        rpc Posts(QueryPostsRequest) returns (QueryPostsResponse) {
                option (google.api.http).get = "/example/blog/blog/posts";
        }

}

// 对message 的QueryPostsRequest 类型定义两个字段
message QueryPostsRequest {
+ string title = 1;
+ string body = 2;
}
```

### grpc_query_posts.go

```go
package keeper

import (
    "context"
    "github.com/example/blog/x/blog/types"
    sdk "github.com/cosmos/cosmos-sdk/types"
    "google.golang.org/grpc/codes"
    "google.golang.org/grpc/status"
)
// 这里的Posts函数就是keeper函数，用于处理请求和返回数据
func (k Keeper) Posts(goCtx context.Context,  req *types.QueryPostsRequest) 
(*types.QueryPostsResponse, error){
    // 如果是空请求返回nil
    if req == nil {
        return nil, status.Error(codes.InvalidArgument, "invalid request")
    }
    // 将context赋值给ctx
    ctx := sdk.UnwrapSDKContext(goCtx)
    _ = ctx
    // 这里的QueryPostsResponse就是要返回的数据类型对象，默认为一个空对象
-    return &types.QueryPostsResponse{}, nil
   // 我们现在给他返回一个字段
+   return &types.QueryPostsResponse{Title:"Hello",Body:"World"}, nil
}

```

如果此时您输入命令行`hypatiad q blog posts`查看请求的时候会发现返回Not Implemented。这是由于尚未与API进行相连。所以打开`x/blog/module.go`

```go
package blog

import (
        "encoding/json"
        "fmt"
        // this line is used by starport scaffolding # 1
+       "context"
        "github.com/gorilla/mux"
        "github.com/grpc-ecosystem/grpc-gateway/runtime"
        "github.com/spf13/cobra"

        abci "github.com/tendermint/tendermint/abci/types"

        "github.com/cosmos/cosmos-sdk/client"
        "github.com/cosmos/cosmos-sdk/codec"
        cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
        sdk "github.com/cosmos/cosmos-sdk/types"
        "github.com/cosmos/cosmos-sdk/types/module"
        "github.com/example/blog/x/blog/client/cli"
        "github.com/example/blog/x/blog/keeper"
         "github.com/example/blog/x/blog/types"
        // this line is used by starport scaffolding # ibc/module/import
)

var (
        _ module.AppModule      = AppModule{}
        _ module.AppModuleBasic = AppModuleBasic{}
        // this line is used by starport scaffolding # ibc/module/interface
)

// ----------------------------------------------------------------------------
// AppModuleBasic
// ----------------------------------------------------------------------------

// AppModuleBasic implements the AppModuleBasic interface for the capability module.
type AppModuleBasic struct {
        cdc codec.Marshaler
}

func NewAppModuleBasic(cdc codec.Marshaler) AppModuleBasic {
        return AppModuleBasic{cdc: cdc}
}

// Name returns the capability module's name.
func (AppModuleBasic) Name() string {
        return types.ModuleName
}

func (AppModuleBasic) RegisterCodec(cdc *codec.LegacyAmino) {
        types.RegisterCodec(cdc)
}

func (AppModuleBasic) RegisterLegacyAminoCodec(cdc *codec.LegacyAmino) {
        types.RegisterCodec(cdc)
}

// RegisterInterfaces registers the module's interface types
func (a AppModuleBasic) RegisterInterfaces(reg cdctypes.InterfaceRegistry) {
        types.RegisterInterfaces(reg)
}

// DefaultGenesis returns the capability module's default genesis state.
func (AppModuleBasic) DefaultGenesis(cdc codec.JSONMarshaler) json.RawMessage {
        return cdc.MustMarshalJSON(types.DefaultGenesis())
}


// ValidateGenesis performs genesis state validation for the capability module.
func (AppModuleBasic) ValidateGenesis(cdc codec.JSONMarshaler, config client.TxEncodingConfig, bz json.RawMessage) error {
        var genState types.GenesisState
        if err := cdc.UnmarshalJSON(bz, &genState); err != nil {
                return fmt.Errorf("failed to unmarshal %s genesis state: %w", types.ModuleName, err)
        }
        return genState.Validate()
}

// RegisterRESTRoutes registers the capability module's REST service handlers.
func (AppModuleBasic) RegisterRESTRoutes(clientCtx client.Context, rtr *mux.Router) {
}
// 划重点
// RegisterGRPCGatewayRoutes registers the gRPC Gateway routes for the module.
func (AppModuleBasic) RegisterGRPCGatewayRoutes(clientCtx client.Context, mux *runtime.ServeMux) {
+        types.RegisterQueryHandlerClient(context.Background(), mux, types.NewQueryClient(clientCtx))
}

// GetTxCmd returns the capability module's root tx command.
func (a AppModuleBasic) GetTxCmd() *cobra.Command {
        return cli.GetTxCmd()
}

// GetQueryCmd returns the capability module's root query command.
func (AppModuleBasic) GetQueryCmd() *cobra.Command {
        return cli.GetQueryCmd(types.StoreKey)
}

// ----------------------------------------------------------------------------
// AppModule
// ----------------------------------------------------------------------------

// AppModule implements the AppModule interface for the capability module.
type AppModule struct {
        AppModuleBasic
        keeper keeper.Keeper
}

func NewAppModule(cdc codec.Marshaler, keeper keeper.Keeper) AppModule {
        return AppModule{
                AppModuleBasic: NewAppModuleBasic(cdc),
                keeper:         keeper,
        }
}

// Name returns the capability module's name.
func (am AppModule) Name() string {
        return am.AppModuleBasic.Name()
}

// Route returns the capability module's message routing key.
func (am AppModule) Route() sdk.Route {
        return sdk.NewRoute(types.RouterKey, NewHandler(am.keeper))
}

// QuerierRoute returns the capability module's query routing key.
func (AppModule) QuerierRoute() string { return types.QuerierRoute }

// LegacyQuerierHandler returns the capability module's Querier.
func (am AppModule) LegacyQuerierHandler(legacyQuerierCdc *codec.LegacyAmino) sdk.Querier {
        return nil
}

// RegisterServices registers a GRPC query service to respond to the
// module-specific GRPC queries.
func (am AppModule) RegisterServices(cfg module.Configurator) {
        types.RegisterQueryServer(cfg.QueryServer(), am.keeper)
}

// RegisterInvariants registers the capability module's invariants.
func (am AppModule) RegisterInvariants(_ sdk.InvariantRegistry) {}
// InitGenesis performs the capability module's genesis initialization It returns
// no validator updates.
func (am AppModule) InitGenesis(ctx sdk.Context, cdc codec.JSONMarshaler, gs json.RawMessage) []abci.ValidatorUpdate {
        var genState types.GenesisState
        // Initialize global index to index in genesis state
        cdc.MustUnmarshalJSON(gs, &genState)

        InitGenesis(ctx, am.keeper, genState)

        return []abci.ValidatorUpdate{}
}

// ExportGenesis returns the capability module's exported genesis state as raw JSON bytes.
func (am AppModule) ExportGenesis(ctx sdk.Context, cdc codec.JSONMarshaler) json.RawMessage {
        genState := ExportGenesis(ctx, am.keeper)
        return cdc.MustMarshalJSON(genState)
}


// BeginBlock executes all ABCI BeginBlock logic respective to the capability module.
func (am AppModule) BeginBlock(_ sdk.Context, _ abci.RequestBeginBlock) {}

// EndBlock executes all ABCI EndBlock logic respective to the capability module. It
// returns no validator updates.
func (am AppModule) EndBlock(_ sdk.Context, _ abci.RequestEndBlock) []abci.ValidatorUpdate {
        return []abci.ValidatorUpdate{}
}
```

`hypatiad q blog posts`如果返回

```js
{
  "title": "Hello!",
  "body": "World"
}
```

那么恭喜您，您的区块链Hello World运行成功。
